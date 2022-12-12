import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { orderBy as OrderBy } from 'src/app/shared/helpers/orderBy.helper';
import { Champion } from 'src/app/shared/models/champion.model';
import { Item } from 'src/app/shared/models/item.model';
import { Trait } from 'src/app/shared/models/traits.model';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { TraitService } from 'src/app/shared/services/trait.service';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.scss']
})

export class ItemManagerComponent implements OnInit {
  //#region variable
  showMyContainer : boolean = false;
  champions: Champion[] = [];
  items : Item[] = [];
  itemsComble : Item[] = [];
  
  myChampions : Champion[] = [];
  myItems : Item[] = [];
  LIST_IDS : string[] = ["removeBin"];
  
  craftableItems : Item[] = [];
  allTraits : Trait[] = [];
  itemsCarousel : Item[] = [];
  //#endregion

  filteredChampions: Observable<Champion[]> | undefined;
  filterName:string = "";
  
  constructor(
    private championService: ChampionService,
    private itemService: ItemService,
    private traitService: TraitService,
     private route:Router 
    ) { }
  
  ngOnInit(): void {
    this.champions = this.championService.getAll();
    this.items = this.itemService.getAll();
    this.itemsComble = this.items.filter(i=>i.id<10);
    
    this.allTraits = OrderBy(this.traitService.getPerma(),"name");
  }
  
  selectChampion(champ : Champion) : void{
    this.championService.getRecommandedItem(champ);
    var newChamp = Object.assign({}, champ);
    newChamp.equippedItems = [];
    
    //TODO créer un clone pour ne pas avoir la meme liste d'item
    newChamp.ability={};
    newChamp.synergies=[];
    newChamp.dataTraits.forEach(trait =>{trait.desc="";trait.effects=[],trait.champions=[] });
    newChamp.stats=undefined;
    var o = newChamp.typeAdAp;
    var tempcopy = JSON.stringify(newChamp)
    var cloneChamp = JSON.parse(tempcopy);
    this.myChampions?.push(cloneChamp);
    
    //pour la gestion des multi drop zone
    //generation d'un id random
    var id : number = Math.floor((Math.random()*(999-1))+1); 
    var i = 0;
    while(this.LIST_IDS.some(lid=>lid == 'cdk-drop-list-champion-'+id) && i <1000)
    {
      id = Math.floor((Math.random()*(999-1))+1); 
      i++;
    }
    cloneChamp.id = id;
    this.LIST_IDS.push('cdk-drop-list-champion-' + cloneChamp.id )
    
    //this.refreshItemDisplay();
  }
  
  selectItem(item : Item) : void{
    this.myItems?.push(item);
    //verifier si l'item en question est présent dans la liste de recipe pour chaques item pour chaques champion
    //si oui 
    //alors l'item dans le recipe ou l'item du champion se met a surbriller via la classe glow
    //this.refreshItemDisplay();
  }
}
