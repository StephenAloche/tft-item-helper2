import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, takeUntil } from 'rxjs';
import { currentSetNum } from 'src/app/app.component';
import { cleanItemVariable } from '../helpers/cleanSource.helper';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  destroy$ = new Subject();

  private items: Item[] = [];
  constructor(
    private http: HttpClient
  ) { }

  ngOnDestroy() {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  private getListItem() {
    if (this.items.length < 1) {
      var listItem: any[] = [];

      let jsonURL = `assets/dataSets/Set${currentSetNum}/itemData_Set${currentSetNum}.json`;

      this.http.get(jsonURL).subscribe(
        {
          next: (data: any) => {
            listItem = data;
            try {
              this.items = cleanItemVariable(listItem);
              this.items.forEach(item => {
                this.formatItem(item);
                this.getItemRecipe(item);
              });
            } catch (error) {

            }
          },
          error: (error) => console.error(error.toString())
        }
      );
    }
  }

  getAll(): Item[] {
    if (this.items.length < 1) {
      of(this.getListItem());
    }
    return this.items;
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

  getByName(name: string): Item | undefined {
    var item = this.getAll()?.find(it => it?.name?.trim().toUpperCase().includes(name.trim().toUpperCase().replace('’', '\'')));
    if (item) {
      this.getItemRecipe(item);
    }
    return item;
  }

  getById(id: number): Item | undefined {
    var item = this.getAll()?.find(it => it?.id == id);
    if (item) {
      this.getItemRecipe(item);
    }
    return item;
  }

  getItemRecipe(item: Item) {
    item.recipe = [];
    var i: number = 0;
    item.from?.forEach(id => {
      var itemSource = this.getById(id);
      if (itemSource) {
        this.formatItem(itemSource);
        var tempcopy = JSON.stringify(itemSource)
        var copy = JSON.parse(tempcopy);
        item.recipe.push(copy);
        i == 0 ? item.recipeItem1 = copy : item.recipeItem2 = copy;
        i++;
      }
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
