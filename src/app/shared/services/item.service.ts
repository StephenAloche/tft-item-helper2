import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject, takeUntil, switchMap, } from 'rxjs';
import { map } from 'rxjs/operators';
import { currentSetNum } from 'src/app/app.component';
import { cleanItemVariable } from '../helpers/cleanSource.helper';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit {

  destroy$ = new Subject();

  private _items: Item[];
  public get items(): Item[] {
    if (this._items.length < 1) {
      this.getAll().subscribe(items => this.items = items)
    }
    return this._items;
  }
  public set items(v: Item[]) {
    this._items = v;
  }


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const getListItemObserver = {
      next: (item: any) => this.getListItem(),
      error: (error: any) => console.error(error.toString()),
      compelte: () => null,
    }
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  public getListItem(): Observable<Item[]> {
    let jsonURL = `assets/dataSets/Set${currentSetNum}/itemData_Set${currentSetNum}.json`;
    return this.http.get<Item[]>(jsonURL);
  }


  getAll(): Observable<Item[]> {
    return this.getListItem().pipe(map(
      (listItem: Item[]) => {
        try {
          listItem = cleanItemVariable(listItem);
          listItem.forEach(item => {
            this.formatItem(item);
            //this.getItemRecipe(item);
          });
        } catch (error) {
          console.error(error);
        }
        this.items = listItem
        return listItem
      }
    ));
  }

  getOtherItem(itemFull: Item, itemGot: Item): Item | undefined {
    var item;
    if (itemFull.recipeItem1?.name != itemGot.name && itemFull.recipeItem2?.name != itemGot.name) {
      return undefined;
    }

    if (itemFull.recipeItem1?.name == itemGot.name) {
      item = itemFull.recipeItem2;
    }
    else {
      item = itemFull.recipeItem1;
    }
    return item;
  }

  getByName(name: string): Observable<Item | undefined> {
    return this.getAll().pipe(map(
      (items: Item[]) => {
        var item = items.find(
          it => it?.name?.trim().toUpperCase().includes(name.trim().toUpperCase().replace('’', '\''))
        )
        if (item) {
          this.getItemRecipe(item);
        }
        return item
      }
    )
    );



    var item: Item | undefined;
    return this.getAll().pipe(map(
      (items: Item[]) => {
        var item = items.find(
          it => it?.name?.trim().toUpperCase().includes(name.trim().toUpperCase().replace('’', '\''))
        )
        if (item) {
          this.getItemRecipe(item);
        }
        return item
      }
    ));
    return of(item);
  }

  getById(id: number): Observable<Item | undefined> {
    var item: Item | undefined;
    this.getAll().subscribe(
      items => {
        item = items.find(
          it => it?.id == id
        )
        if (item) {
          this.getItemRecipe(item);
        }
      }
    );
    return of(item);
  }

  getItemRecipe(item: Item) {
    item.recipe = [];
    var i: number = 0;
    item.from?.forEach(id => {
      this.getById(id).subscribe(itemSource => {
        if (itemSource) {
          this.formatItem(itemSource);
          var tempcopy = JSON.stringify(itemSource)
          var copy = JSON.parse(tempcopy);
          item.recipe.push(copy);
          i == 0 ? item.recipeItem1 = copy : item.recipeItem2 = copy;
          i++;
        }
      }
      );
    });
  }

  formatItem(item: Item): Item {
    item.icon = item.icon?.toLowerCase().replace('dds', 'png'); //.replace('.tft_set','_mobile.tft_set')
    const regex = /%i:[a-zA-Z]*%/;
    for (let effName in item.effects) {
      //remplacement variable par leur nom
      const regexVaribale = `@${effName}@`
      var re = new RegExp(regexVaribale, "g");
      item.desc = item.desc?.replace(regex, '').replace(re, `<b class="text-danger">${item.effects[effName]}</b>`);
    }
    return item;
  }

}
