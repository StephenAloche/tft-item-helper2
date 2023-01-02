import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject, takeUntil, switchMap, } from 'rxjs';
import { map } from 'rxjs/operators';
import { currentSetNum, ITEM_IMG_URL, ITEM_SPAT_IMG_URL } from 'src/app/app.component';
import { cleanItemName, cleanItemVariable } from '../helpers/cleanSource.helper';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit {

  unsubscribe$ = new Subject();

  public itemsList: Item[];

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
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  public getListItem(): Observable<Item[]> {
    let jsonURL = `assets/dataSets/Set${currentSetNum}/itemData_Set${currentSetNum}.json`;
    return this.http.get<Item[]>(jsonURL);
  }

  loadItems(): void {
    this.getListItem().pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (listItem: Item[]) => {
        try {
          this.itemsList =  cleanItemVariable(listItem);
          this.itemsList.forEach(item => {
            this.formatItem(item);
            this.getItemRecipe(item);
          });
        } catch (error) {
          console.error(error);
        }
      }
    );
  }

  getAll(): Observable<Item[]> {
    if(this.itemsList)
    {
      return of(this.itemsList)
    }
    return this.getListItem().pipe(map(
      (listItem: Item[]) => {
        try {
          this.itemsList = cleanItemVariable(listItem);
          this.itemsList.forEach(item => {
            this.formatItem(item);
            this.getItemRecipe(item);
          });
        } catch (error) {
          console.error(error);
        }
        return this.itemsList
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
        let item = items.find(
          it => it?.cleanName?.toUpperCase().includes(cleanItemName(name!).toUpperCase())
        )
        return item
      }
    )
    );
  }

  getManyByName(names: string[]): Observable<Item[]> {
    names = names.map(n=>cleanItemName(n.toUpperCase()));
    return this.getAll().pipe(
      map(
        (items : Item[]) => {
          return items.filter(item => names?.includes(item.cleanName!.toUpperCase()));
        }
      ))
  }

  getById(id: number): Observable<Item | undefined> {
    return this.getAll().pipe(map(
      (items: Item[]) => {
        let item = items.find(
          it => it?.id == id
        )
        return item
      }
    )
    );
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
    item.icon = item.icon?.toLowerCase().includes('spatula/')
    ? ITEM_SPAT_IMG_URL + item.icon?.toLowerCase().split('/').pop()?.replace('dds', 'png')
    : ITEM_IMG_URL + item.icon?.toLowerCase().split('/').pop()?.replace('dds', 'png');

item.cleanName = cleanItemName(item.name??'');

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
