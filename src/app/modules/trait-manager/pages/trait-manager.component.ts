import { Component } from '@angular/core';
import { orderBy } from 'src/app/shared/helpers/orderBy.helper';
import { Champion } from 'src/app/shared/models/champion.model';
import { Item } from 'src/app/shared/models/item.model';
import { ArrayGroup } from 'src/app/shared/models/arrayGroup.model';
import { Trait } from 'src/app/shared/models/traits.model';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { TraitService } from 'src/app/shared/services/trait.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-trait-manager',
  templateUrl: './trait-manager.component.html',
  styleUrls: ['./trait-manager.component.scss']
})
export class TraitManagerComponent {
  traitChampions : Champion[] = [];
  championDuplicate : Champion[] = [];
  allTraits : Trait[] = [];
  otherTraits : Trait[] = [];
  traitSelected : Trait = new Trait();
  SpatItem? : Item;
  itemOrder : Item[] = [];
  
  constructor(private traitService: TraitService, private championService: ChampionService, private itemService: ItemService ) { }
  
  ngOnInit(): void {
    this.traitService.getPerma().subscribe(traits=>
      {
        this.allTraits = orderBy(traits,"name");
      }
      ); 
    }
    
    SelectTrait(trait : Trait):void{
      this.traitSelected =  this.allTraits.filter(c=> c.name == trait.name)[0];
      
      this.championService.getByTrait(trait.name).subscribe(champions =>
        {
          
          this.traitChampions = champions
          
          this.traitChampions.forEach(champ=>{            
          this.championService.getRecommandedItem(champ).subscribe(items => {
            champ.recommandedItems = items;
          });
          })

          this.traitChampions.map(c=>c.recommandedItems).forEach(reco =>{
            var allitems  : Item[]  = reco.filter(r=>r.ratio > 8).flatMap(r=> r.recipe);
            
            this.itemOrder = this.itemOrder.concat(allitems);
          });
        });
        
        this.itemService.getByName(`${trait.name} Emblem`).subscribe( spatItem=>
          {
            this.SpatItem = spatItem
          });
          this.getOtherTraits(trait);
          
          this.itemOrder =[];
          
          
          var itemGroup = this.groupByCount(this.itemOrder);
          var itemgroupOrder = itemGroup.sort((n1, n2) =>  n2.count - n1.count );  
          this.itemOrder = itemgroupOrder.map(i=>i.element);
        }
        
        getOtherTraits(trait : Trait):void{
          this.otherTraits=[];
          
          this.traitChampions.forEach(champ => { 
            champ.dataTraits.forEach(tr => {
              
              if (trait.name != tr.name && !this.otherTraits.some(t=>t.name == tr.name)) {
                /*
                var champions = this.championService.getByTrait(tr.name);
                champions = champions.filter(c=> c.name != champ.name);
                tr.champions = orderBy(champions,"cost"); //champions.sort((n1, n2) => n1.cost - n2.cost);
                this.otherTraits.push(tr);
                */
                
                this.championService.getByTrait(tr.name).subscribe(championsTrait=>{
                  var champions = championsTrait
                  champions = champions.filter(c=> c.name != champ.name);
                  tr.champions = orderBy(champions,"cost"); //champions.sort((n1, n2) => n1.cost - n2.cost);
                  this.otherTraits.push(tr);
                });            
              }
            });
          }); 
          
          //faire ressortir les champions qui apparaissent plusieurs fois
          this.championDuplicate = this.findDuplicates(this.otherTraits.flatMap(t=>t.champions));
        }
        
        findDuplicates(arr : any[]): any[]{
          const uniqueArray: any[] = [];
          const doublons: any[] = [];
          arr.forEach(element => {
            if(!uniqueArray.some(e=>e == element))
            {
              uniqueArray.push(element);
            }else 
            {
              doublons.push(element);
            }
          });
          
          return doublons;
        }
        
        groupByCount(arr : any[]) : ArrayGroup<Item>[]
        {
          var arrayGroup : ArrayGroup<Item>[] = [];
          arr.forEach(elem => {
            if(!arrayGroup.some(el=> el.element.name == elem.name))
            {
              arrayGroup.push({element : elem,count:1})
            }
            else{
              arrayGroup.filter(i=>i.element.name == elem.name)[0].count ++
            }
          });
          return arrayGroup; 
        }  
      }
      