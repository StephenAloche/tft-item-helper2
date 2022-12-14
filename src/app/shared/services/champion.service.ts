import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, of, mergeMap, toArray } from 'rxjs';
import { CHAMPION_IMG_URL, currentSetNum } from 'src/app/app.component';
import { TypeAdAp } from '../enums/TypeAdAp.enum';
import { cleanChampionName } from '../helpers/cleanSource.helper';
import { groupBy } from '../helpers/groupBy.helper';
import { orderBy, orderByArrayLength } from '../helpers/orderBy.helper';
import { Ability, Champion } from '../models/champion.model';
import { Item, newItem } from '../models/item.model';
import { Trait } from '../models/traits.model';
import { ItemService } from './item.service';
import { SetService } from './set.service';
import { TraitService } from './trait.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {
  champions: Champion[]
  descs: any[]
  recommandedItems: Item[];
  private readonly unsubscribe$ = new Subject();

  constructor(
    private setService: SetService,
    private itemService: ItemService,
    private traitService: TraitService,
    private http: HttpClient
  ) { }

  getAll(): Observable<Champion[]> {
    if (this.champions) {
      return of(this.champions)
    }
    return this.setService.getChampions().pipe(
      map(
        (champs: Champion[]) => {
          champs.forEach(champ => {

            champ = this.formatChampion(champ);
            this.LoadDataTraits(champ);
          });
          orderBy(champs, "name");
          this.champions = champs;
          return this.champions
        }
      )
    );
  }

  getByName(name: string): Champion | undefined {
    var champ = this.champions.find(champ => champ.name.includes(name)) ?? undefined;
    return champ;
  }

  getManyByName(names: string[]): Observable<Champion[]> {
    names = names?.map(n => cleanChampionName(n));
    return this.getAll().pipe(
      map(
        (champions: Champion[]) => {
          return champions.filter(champ => names?.includes(cleanChampionName(champ.name)));
        }
      ))
  }

  getByTrait(traitName: string): Observable<Champion[]> {
    let champs: Champion[] = [];
    return this.getAll().pipe(
      map(
        (champions: Champion[]) => {
          champs = champions.filter(c => c.traits?.some(t => t.toLowerCase() == traitName.toLowerCase()));
          //tir?? par cout
          champs = champs.sort((a, b) => {
            const costDiff = a.cost - b.cost;
            if (costDiff) return costDiff;
            return a.name.localeCompare(b.name); // Use a polyfill for IE support
          });

          return champs;
        }
      )
    )
  }

  getRecommandedItem(champion: Champion): Observable<Item[]> {
    let jsonURL = `assets/dataSets/Set${currentSetNum}/championRecoItem_Set${currentSetNum}.json`;
    let recommandedItems: Item[] = [];

    return this.http.get<any[]>(jsonURL).pipe(
      map(
        (listJsonRecoItem: any[]) => {
          let recoitem = listJsonRecoItem.filter(json => cleanChampionName(json.champion).toLowerCase() == cleanChampionName(champion.name).toLowerCase())[0];
          if (!recoitem) {
            console.error(`erreur:  pas d'items recommand?? pour ce perso : ${champion.name}`);
          }
          recoitem?.items?.forEach((item: any) => {

            item.name = item.name.replace('???', '\'');
            item.ratio = item.ratio.replace('%', '');

            var itemChamp = this.itemService.getByName(item.name).subscribe(
              (itemChamp: Item | undefined) => {
                if (itemChamp) {
                  var cloneItem = newItem(itemChamp);
                  cloneItem.ratio = +item.ratio; //cast int

                  recommandedItems.push(cloneItem);
                }
                return recommandedItems
              }
            )
          });
          return recommandedItems
        }
      )
    )
  }

  /*return base items order by usabillity in reco items */
  getSimpleItems(champion: Champion): Observable<Item[]> {
    let recommandedItems: Item[] = [];

    return this.getRecommandedItem(champion).pipe(
      map((recoItems: Item[]) => {

        let flat = recoItems.flatMap(i => i.recipe); //on recupere tout les items des recipes
        const groupedItems = groupBy<Item>('name', flat); // on les regroupes par nom et array

        //on les ordonnes par length des array
        recommandedItems = orderByArrayLength<Item[]>(
          groupedItems.map(g => g.values)
          , true
        )
        //on prends le premier item de chaques array
          .map(g => g[0]);
        return recommandedItems;
      }
      )
    );
  }


  LoadDataTraits(champ: Champion): void {
    champ.dataTraits = [];
    champ.traits?.forEach(trait => {
      var traitSelect = this.setService.dataTraits?.find(t => t.name == trait);
      if (traitSelect) {
        traitSelect = this.traitService.LoadTraitDesc(traitSelect);
        champ.dataTraits?.push(traitSelect);
      }
    });
  }

  LoadDataTraitsObservable(champ: Champion): Observable<Champion> {
    champ.dataTraits = [];
    champ.traits?.forEach(trait => {
      this.traitService.getByName(trait).pipe(map(
        (traitSelect: Trait | undefined) => {
          if (traitSelect) {
            traitSelect = this.traitService.LoadTraitDesc(traitSelect);
            champ.dataTraits?.push(traitSelect);
          }
        }
      ))
      return of(champ);
    });
    return of(champ);
  }

  LoadEasyDesc(champName: string): Observable<string> {
    if (this.descs) {
      return of(this.descs.find(d => d.champion === champName)?.desc)
    }

    let jsonURL = `assets/dataSets/Set${currentSetNum}/champEasyDesc.json`;
    return this.http.get<any[]>(jsonURL).pipe(
      map(
        (listAllDesc: any[]) => {
          this.descs = listAllDesc;
          return listAllDesc.find(d => d.champion === champName).desc;
        }
      )
    );
  }

  formatDesc(ability: Ability | undefined, star: number): string {

    if (!ability)
      return "";

    var desc: string | undefined = ability.desc;

    ability.variables?.forEach(variable => {
      //remplacement variable par leur nom
      const regexVaribale = `@${variable.name}@`
      var re = new RegExp(regexVaribale, "g");
      if (variable.value) {
        if (variable.name?.includes("*100"))
          variable.value[star] = Math.round(variable.value[star] * 100);
        desc = desc?.replace(re, `${variable.value[star]}`);
      }
    });
    const regex = /\(?@[a-zA-Z0-9]+@\)?/g;
    desc = desc?.replace(regex, '...')
    return desc ?? "";
  }

  formatChampion(champ: Champion): Champion {
    champ.icon = CHAMPION_IMG_URL + champ.icon?.toLowerCase().split('/').pop()?.replace('dds', 'png');
    champ.typeAdAp = champ.ability?.desc?.toLowerCase().includes("attack damage") ? TypeAdAp.Ad : TypeAdAp.Ap
    champ.stars = 1;

    if (champ.ability) {
      champ.ability.desc = this.formatDesc(champ.ability, champ.stars);
      champ.ability.easyDesc$ = this.LoadEasyDesc(champ.name);
    }

    if (champ.ability)
      champ.ability.icon = champ.ability?.icon?.toLowerCase().split('/').pop()?.replace('dds', 'png'); //.replace('.tft_set','_mobile.tft_set')
    if (champ.stats) {
      champ.stats.hpDisplay = champ.stats.hp;
      champ.stats.damageDisplay = champ.stats.damage;
      champ.stats.attackSpeed = Math.round((champ.stats?.attackSpeed ?? 0) * 100) / 100;
      champ.stats.critMultiplier = Math.round((champ.stats?.attackSpeed ?? 0) * 100) / 100;
      champ.stats.critChance = Math.round((champ.stats?.attackSpeed ?? 0) * 100) / 100;
      champ.stats!.dps = champ.stats!.dpsDisplay = Math.round(((champ.stats.damageDisplay * champ.stats.attackSpeed) ?? 0) * 100) / 100;
    }
    return champ
  }

}

interface Counts {
  [key: string]: number;
}
