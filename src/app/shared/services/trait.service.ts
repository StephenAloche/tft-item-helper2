import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { State } from '../enums/State.enum';
import { Trait } from '../models/traits.model';
import { ItemService } from './item.service';
import { SetService } from './set.service';

@Injectable({
  providedIn: 'root'
})
export class TraitService {  
  constructor(
    private setService : SetService,
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
          let trait = traits.find(tr=>tr?.name?.includes(name)||tr?.apiName?.includes(name));
          if (trait) {
            this.LoadTraitDesc(trait);
          } 
          return trait;
        }
      )
      );
    }    
    
    LoadTraitDesc(trait : Trait) : Trait{
      //duplication des lignes par effets
      var regex = /<expandRow>.*<\/expandRow>/;
      const matche = trait.desc.match(regex);
      if(matche)
      {
        
        for (let index = 0; index < trait.effects.length-1; index++) {
          trait.desc += matche![0];
        }
      }
      trait.state = State.Unactive;
      //remplacement par ul li
      trait.effects.forEach(effect => {
        
        if(effect == trait.effects[0])//premier
        {
          trait.desc = trait.desc.replace("<expandRow>","<ul><li>");
          trait.desc = trait.desc.replace("</expandRow>","</li>");
        }
        else if(effect == trait.effects[trait.effects.length-1]) // dernier
        {
          trait.desc = trait.desc.replace("<expandRow>","<li>");
          trait.desc = trait.desc.replace("</expandRow>","</li></ul>");
        }
        else {
          trait.desc = trait.desc.replace("<expandRow>","<li>");
          trait.desc = trait.desc.replace("</expandRow>","</li>");
        }
        //remplacement des variables      
        trait.desc = trait.desc.replace("(@MinUnits@)",`<div class="trait-num">${effect.minUnits.toString()}</div>`);
        for (let variable in effect.variables) {
          
          if(variable.includes("*100"))
          effect.variables[variable] = Math.round(effect.variables[variable]*100)
          
          trait.desc = trait.desc.replace(`@${variable}@`,`${effect.variables[variable] }`);
        }       
      });
      
      var expandrowEnd = new RegExp("</expandRow>", "g");
      var expandrow = new RegExp("<expandRow>", "g");
      trait.desc = trait.desc.replace(expandrowEnd,"</li>");
      trait.desc = trait.desc.replace(expandrow,"<li>");
      trait.palliers = this.getPallier(trait);
      trait.currentNumber = 0;
      trait.currentPallier = 0;
      //trait.isSpat = this.itemService.getByName(`${trait.name} Emblem`)!=undefined;    
      
      return trait;   
    }
    
    getPallier(trait : Trait) : number[]{
      var pallierArray : number[] = [];
      pallierArray = trait.effects.map(eff=>eff.minUnits);
      return pallierArray;
    }
  }
  