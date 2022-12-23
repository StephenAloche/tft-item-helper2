import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { State } from '../enums/State.enum';
import {  orderByDescending } from '../helpers/orderBy.helper';
import { Trait } from '../models/traits.model';
import { ItemService } from './item.service';
import { SetService } from './set.service';

@Injectable({
  providedIn: 'root'
})
export class TraitService {
  constructor(
    private setService: SetService,
    private itemService: ItemService
  ) { }

  getAll(): Observable<Trait[]> {
    var traits = this.setService.getTraits();
    return traits;
  }

  getPerma(): Observable<Trait[]> {
    var traits = this.setService.getTraits();
    return traits;
  }

  getByName(name: string): Observable<Trait | undefined> {
    return this.getAll().pipe(map(
      (traits: Trait[]) => {
        let trait = traits.find(tr => tr?.name?.includes(name) || tr?.apiName?.includes(name));
        if (trait) {
          this.LoadTraitDesc(trait);
        }
        return trait;
      }
    )
    );
  }

  LoadTraitDesc(trait: Trait): Trait {
    //duplication des lignes par effets
    var regex = /<expandRow>.*<\/expandRow>/;
    const matche = trait.desc.match(regex);
    if (matche) {

      for (let index = 0; index < trait.effects.length - 1; index++) {
        trait.desc += matche![0];
      }
    }
    trait.state = State.Unactive;
    //remplacement par ul li
    trait.effects.forEach(effect => {

      if (effect == trait.effects[0])//premier
      {
        trait.desc = trait.desc.replace("<expandRow>", "<ul><li>");
        trait.desc = trait.desc.replace("</expandRow>", "</li>");
      }
      else if (effect == trait.effects[trait.effects.length - 1]) // dernier
      {
        trait.desc = trait.desc.replace("<expandRow>", "<li>");
        trait.desc = trait.desc.replace("</expandRow>", "</li></ul>");
      }
      else {
        trait.desc = trait.desc.replace("<expandRow>", "<li>");
        trait.desc = trait.desc.replace("</expandRow>", "</li>");
      }
      //remplacement des variables      
      trait.desc = trait.desc.replace("(@MinUnits@)", `<div class="trait-num">${effect.minUnits.toString()}</div>`);
      for (let variable in effect.variables) {

        if (variable.includes("*100"))
          effect.variables[variable] = Math.round(effect.variables[variable] * 100)

        trait.desc = trait.desc.replace(`@${variable}@`, `${effect.variables[variable]}`);
      }
    });

    var expandrowEnd = new RegExp("</expandRow>", "g");
    var expandrow = new RegExp("<expandRow>", "g");
    trait.desc = trait.desc.replace(expandrowEnd, "</li>");
    trait.desc = trait.desc.replace(expandrow, "<li>");
    trait.palliers = this.getPallier(trait);
    trait.currentNumber = 0;
    trait.currentPallier = 0;
    //trait.isSpat = this.itemService.getByName(`${trait.name} Emblem`)!=undefined;    

    return trait;
  }

  getPallier(trait: Trait): number[] {
    var pallierArray: number[] = [];
    pallierArray = trait.effects.map(eff => eff.minUnits);
    return pallierArray;
  }

  reorderTraits(traitsActiv: Trait[]): Trait[] {

    var traitsClean: Trait[] = [];
    var activesTraits : Trait[] = [];
    //on a une liste de tous les traits
    traitsActiv.forEach(trait => {
      //pour chaque trait on compte combien il y  en a dans la liste
      //on ajout ce count au currentNumber
      trait.currentNumber = traitsActiv.filter(t => t.name == trait.name).length
    });

    //on les regroupe distinctement - ne marche plus parfaitement car concat ou set ne distinct plus 2 trait identique
    activesTraits = [...new Set([...traitsActiv])];
    activesTraits = traitsActiv.unique();

    if (activesTraits[0] != undefined) {
      //pour chacun on teste les palliers (Effect)
      activesTraits.forEach(trait => {
        //pour chaques trait on boucle sur les pallier
        if (trait.currentNumber >= trait.effects[0].minUnits) {
          trait.effects.forEach(pallier => {
            if (trait.currentNumber >= pallier.minUnits) {
              trait.currentPallier = pallier.minUnits;
              trait.nextPallier = trait.effects.filter(e => e.minUnits >= pallier.maxUnits + 1)[0]?.maxUnits ?? 1;

              if (pallier.maxUnits == 25000) {
                trait.state = State.Gold;
              }
              else {
                if (pallier == trait.effects[0])
                  trait.state = State.Bronze;

                else if (pallier == trait.effects[1])
                  trait.state = State.Silver;

                else if (pallier == trait.effects[2])
                  trait.state = State.Gold;

                else if (pallier == trait.effects[3])
                  trait.state = State.Prisma;

                else
                  trait.state = State.Unactive;
              }
            }
          });
        }
        else {
          trait.state = State.Unactive;
          trait.nextPallier = trait.effects[0].minUnits;
        }
      });

      //on desactive les traits qui s'annule
      // if(this._activesTraits.some(t=>t.name=="Dragon") && this._activesTraits.some(t=>t.name=="Brise-écaille"))
      // {
      //   this._activesTraits.forEach(t=>{if(t.name=="Brise-écaille") t.state = State.Unactive});        
      // }

      //activesTraits?.sort((n1, n2) => n2.state - n1.state)
      orderByDescending(activesTraits,"state"); // a tester
    }
    return activesTraits;
  }
}

declare global {
  interface Array<T> {
    unique(): any[];
  }
}

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i].name === a[j].name)
        a.splice(j--, 1);
    }
  }

  return a;
};

