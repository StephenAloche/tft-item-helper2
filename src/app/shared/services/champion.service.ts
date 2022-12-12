import { Injectable } from '@angular/core';
import { currentSetNum } from 'src/app/app.component';
import { TypeAdAp } from '../enums/TypeAdAp.enum';
import { cleanName } from '../helpers/cleanSource.helper';
import { orderBy } from '../helpers/orderBy.helper';
import { Ability, Champion } from '../models/champion.model';
import { ItemService } from './item.service';
import { SetService } from './set.service';
import { TraitService } from './trait.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {
  champions :Champion[]
  
  constructor(
    private setService : SetService,
    private itemService : ItemService,
    private traitService: TraitService
    
    ) 
    { 
      
    }
    
    getAll(): Champion[] {
      if(!this.champions){
        
        var champs = this.setService.getChampions();
        
        champs.forEach(champ => {
          
          champ.icon = champ.icon?.toLowerCase().replace('dds','png'); //.replace('.tft_set','_mobile.tft_set')
          champ.typeAdAp = champ.ability?.desc?.toLowerCase().includes("attack damage") ? TypeAdAp.Ad : TypeAdAp.Ap
          champ.stars = 1;
          
          if(champ.ability)
          {
            champ.ability.desc = this.formatDesc(champ.ability, champ.stars);
            champ.ability.easyDesc = this.LoadEasyDesc(champ.name);
          }
          
          if(champ.ability)
          champ.ability.icon = champ.ability?.icon?.toLowerCase().replace('dds','png'); //.replace('.tft_set','_mobile.tft_set')
          if (champ.stats) {     
            champ.stats.hpDisplay = champ.stats.hp;
            champ.stats.damageDisplay = champ.stats.damage;        
            champ.stats.attackSpeed = Math.round((champ.stats?.attackSpeed??0) *100)/100;
            champ.stats.critMultiplier = Math.round((champ.stats?.attackSpeed??0) *100)/100;
            champ.stats.critChance = Math.round((champ.stats?.attackSpeed??0) *100)/100;
            champ.stats!.dps = champ.stats!.dpsDisplay = Math.round(((champ.stats.damageDisplay * champ.stats.attackSpeed) ??0) *100)/100;
          }
          
          this.LoadDataTraits(champ);
          //champ.traitsIcon = champ.traits?.map((t: string) => `${this.TRAITURL}${this.TRAITSUFFIXE}${this.setNum}_${t.toLowerCase()}.png`);
        }); 
        orderBy(champs,"name");
        this.champions = champs;
      }
      return this.champions
    }
    
    getRecommandedItem(champion : Champion) : void{
    
      var listJsonRecoItem : any[] = []; //TODO : a remplacer par la recuperation du fichier json
      
      var recoitem = listJsonRecoItem.filter(json => cleanName(json.champion).toLowerCase() == cleanName(champion.name).toLowerCase())[0];
      
      champion.recommandedItems = [];
      
      if (!recoitem)
      {
        console.error(`erreur:  pas d'items recommandé pour ce perso : ${champion.name}`);
      }
      
      recoitem?.items?.forEach((item: any) => {
        
        item.name = item.name.replace('’','\'');
        item.ratio = item.ratio.replace('%','');
        
        var itemChamp = this.itemService.getByName(item.name);
        if (itemChamp) {
          
          var tempcopy = JSON.stringify(itemChamp)
          var cloneItem = JSON.parse(tempcopy);
          
          cloneItem.ratio = +item.ratio; //cast int
  
          champion.recommandedItems.push(cloneItem);        
        }
      });
      
    }
    
    LoadEasyDesc(champName : string): string{
      return "";//JSONEASYDESC75.filter(c=>c.champion==champName)[0]?.desc;
    }
    
    formatDesc(ability : Ability|undefined, star : number) : string{
      
      if(!ability)
      return "";
      
      var desc : string |undefined = ability.desc;     
      
      ability.variables?.forEach(variable => {
        //remplacement variable par leur nom
        const regexVaribale = `@${variable.name}@`
        var re = new RegExp(regexVaribale,"g");
        if(variable.value)
        {          
          if(variable.name?.includes("*100"))
          variable.value[star] = Math.round(variable.value[star]*100);
          desc = desc?.replace(re,`${variable.value[star]}`);
        }        
      });
      const regex = /\(?@[a-zA-Z0-9]+@\)?/g;
      desc = desc?.replace(regex,'...')
      return desc??"";
    }
    
    LoadDataTraits(champ : Champion):void{
      champ.dataTraits = [];
      
      champ.traits?.forEach(trait => {
        var traitSelect = this.traitService.getByName(trait)
        if(traitSelect)
        {
          traitSelect = this.traitService.LoadTraitDesc(traitSelect);
          champ.dataTraits?.push(traitSelect);
        }
      });   
    }    
  }
  