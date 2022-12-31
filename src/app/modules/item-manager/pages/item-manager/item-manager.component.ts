import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { orderBy as OrderBy } from 'src/app/shared/helpers/orderBy.helper';
import { Champion } from 'src/app/shared/models/champion.model';
import { Item } from 'src/app/shared/models/item.model';
import { Trait } from 'src/app/shared/models/traits.model';
import { ChampionService } from 'src/app/shared/services/champion.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { TraitService } from 'src/app/shared/services/trait.service';
import { CHAMPION_IMG_URL, ITEM_IMG_URL, ITEM_SPAT_IMG_URL, TRAIT_IMG_URL } from 'src/assets/const-path-img';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrls: ['./item-manager.component.scss']
})

export class ItemManagerComponent implements OnInit {
  ITEM_IMG_URL = ITEM_IMG_URL;
  ITEM_SPAT_IMG_URL = ITEM_SPAT_IMG_URL;
  CHAMPION_IMG_URL = CHAMPION_IMG_URL;
  TRAIT_IMG_URL = TRAIT_IMG_URL;
  //#region variable
  showMyContainer: boolean = false;
  champions: Champion[] = [];
  champions$: Observable<Champion[]>;
  items: Item[] = [];
  
  myChampions: Champion[] = [];
  myItems: Item[] = [];
  LIST_IDS: string[] = ["removeBin"];
  
  craftableItems: Item[] = [];
  allTraits: Trait[] = [];
  itemsCarousel: Item[] = [];
  //#endregion  
  
  myControl = new FormControl();
  filteredChampions: Observable<Champion[]> | undefined;
  filterName: string = "";
  
  filterControl = new FormControl('');
  
  recommandedItems: Item[];
  
  constructor(
    private championService: ChampionService,
    private itemService: ItemService,
    private traitService: TraitService,
    private route: Router
    ) { }
    
    ngOnInit(): void {
      
      this.championService.getAll().subscribe(champions => {
        this.champions = champions        
        
        this.filteredChampions  = this.filterControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
          );
        }
        );
        
        this.traitService.getAll()?.subscribe(traits => {
          this.allTraits = OrderBy(traits, "name");
        }
        );                
      }
      
      //#region combobox
      
      _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.champions.filter(champ => champ.name.toLowerCase().includes(filterValue));
      }
      
      public displayProperty(champion: Champion) {
        if (champion) {
          return champion.name;
        }
        return "";
      }     
      
      public resetfilter() {
        this.filteredChampions = this.filterControl.valueChanges.pipe(
          startWith(''),
          map(championName => (typeof championName === 'string' ? championName : "")),
          map(name => (name ? this._filter(name) : this.champions.slice())),
          );
          this.filterName = "";
          this.filterControl.setValue('');
        }
        
        //#endregion
        
        
        selectChampion(champ: Champion): void {
          this.resetfilter();
          let newChamp = Object.assign({}, champ);
          
          newChamp.equippedItems = [];
          
          //TODO créer un clone pour ne pas avoir la meme liste d'item
          //TODO remplacer les clones par l'utilisation de ...object
          newChamp.ability = {};
          newChamp.synergies = [];
          newChamp.dataTraits?.forEach(trait => { trait.desc = ""; trait.effects = [], trait.champions = [] });
          newChamp.stats = undefined;
          let o = newChamp.typeAdAp;
          let tempcopy = JSON.stringify(newChamp)
          let cloneChamp = JSON.parse(tempcopy);
          
          this.championService.getRecommandedItem(champ).subscribe(items => cloneChamp.recommandedItems = items);
          this.myChampions?.push(cloneChamp);
          
          
          //pour la gestion des multi drop zone
          //generation d'un id random
          let id: number = Math.floor((Math.random() * (999 - 1)) + 1);
          let i = 0;
          while (this.LIST_IDS.some(lid => lid == 'cdk-drop-list-champion-' + id) && i < 1000) {
            id = Math.floor((Math.random() * (999 - 1)) + 1);
            i++;
          }
          cloneChamp.id = id;
          this.LIST_IDS.push('cdk-drop-list-champion-' + cloneChamp.id)
          
          this.refreshItemDisplay();
        }
        
        selectItem(item: Item): void {
          this.myItems?.push(item);
          //verifier si l'item en question est présent dans la liste de recipe pour chaques item pour chaques champion
          //si oui 
          //alors l'item dans le recipe ou l'item du champion se met a surbriller via la classe glow
          this.refreshItemDisplay();
        }
        
        selectTrait(trait: Trait): void {
          this.championService.getByTrait(trait.name).subscribe(
            traitChampions => 
            {
              traitChampions.forEach(c => this.selectChampion(c));
            }
            );
          }
          
          //#region delete
          
          ClearAll(): void {
            this.myItems = [];
            this.myChampions = [];
            this.itemsCarousel = [];
            this.craftableItems = [];
          }
          
          DeleteChampion(champion: Champion): void {
            const index = this.myChampions.indexOf(champion, 0);
            if (index > -1) {
              this.myChampions.splice(index, 1);
            }
            this.myItems = this.myItems.concat(champion.equippedItems);
            this.refreshItemDisplay()
          }
          
          DeleteItem(item: Item): void {
            const index = this.myItems.indexOf(item, 0);
            if (index > -1) {
              this.myItems.splice(index, 1);
            }
            this.refreshItemDisplay()
          }
          
          dropItem(event: CdkDragDrop<Item[]>): void {
            var item = event.previousContainer.data[event.previousIndex]
            if (event.previousContainer === event.container) {
              console.log(item + ' dropped in same list');
              
              moveItemInArray(
                [],
                event.previousIndex,
                event.currentIndex
                );
                
              }
              else {
                console.log(item + ' dropped in other list');
                console.log(item + ' delete');
                this.DeleteItem(item);
              }
            }
            
            dropChampion(event: CdkDragDrop<Champion[]>): void {
              var champion = event.previousContainer.data[event.previousIndex]
              if (event.previousContainer === event.container) {
                console.log(champion + ' dropped in same list');
                
                moveItemInArray(
                  [],
                  event.previousIndex,
                  event.currentIndex
                  );
                  
                }
                else {
                  console.log(champion + ' dropped in other list');
                  console.log(champion + ' delete');
                  this.DeleteChampion(champion);
                }
              }
              //#endregion
              
              
              getItemCaroussel(item: Item): void {
                this.myItems.push(item);
                this.itemsCarousel = [];
                this.refreshItemDisplay();
              }
              
              checkItemCaroussel(): void {
                this.itemsCarousel = [];
                //pour chaques champion, on verifie pour chaques item recommandé si un et un seul de ces recipe est présent dans la liste d'item (is glowing ?)
                //si c'est le cas alors on ajout l'autre item dans la liste des items du carousel
                this.myChampions.forEach(champ => {
                  champ.recommandedItems.forEach(recoItem => {
                    //test si seulement 1 item
                    if (recoItem.recipe?.filter(item => item.isGlowing).length == 1) {
                      var item = recoItem.recipe?.filter(item => !item.isGlowing)[0];
                      if (!this.itemsCarousel.some(ic => ic.name == item.name)) {
                        this.itemsCarousel.push(item);
                      }
                    }
                    //test si pour chaques item recomandés le recipe n'as pas deja 1 élement équipé
                    if (recoItem.recipe?.some(itemr => champ.equippedItems?.some(iteme => iteme.name == itemr.name))) {
                      var itemnew = this.itemService.getOtherItem(recoItem, champ.equippedItems?.filter(iteme => iteme.id < 10)[0]);
                      
                      var item = recoItem.recipe?.filter(item => item.name != champ.equippedItems?.filter(iteme => iteme.id < 10)[0].name)[0];
                      if (!this.itemsCarousel.some(ic => ic.name == item.name)) {
                        this.itemsCarousel.push(item);
                      }
                    }
                  });
                });
              }
              
              getChampForItems(): void {
                this.myItems?.forEach(item => {
                  this.champions?.forEach(champ => {
                    this.championService.getRecommandedItem(champ);
                    champ?.recommandedItems?.forEach(recorecipe => {
                      if (recorecipe.ratio < 8)
                      return;
                      
                      if (recorecipe?.name == item.name || recorecipe?.recipeItem1?.name == item?.name || recorecipe?.recipeItem2?.name == item?.name) {
                        if (!this.myChampions.some(c => c.name == champ.name))
                        this.myChampions.push(champ);
                      }
                    })
                  })
                })
              }
              
              onRightClick(champ: Champion) {  //TODO: a revoir
                this.route.navigate(['champion-helper'], { queryParams: { champSubmit: champ.name } });
                //voir https://stackoverflow.com/questions/36994918/passing-objects-in-routing
              }
              
              refreshItemDisplay(): void {
                this.setItemGlow();
                this.checkCraftableItem();
              }
              
              equipItem(event: CdkDragDrop<Item[]>, champion: Champion) {
                var item = event.previousContainer.data[event.previousIndex];
                if (event.previousContainer === event.container) {
                  moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
                }
                else {
                  //si on ajoute un item basique et que le champion en possede deja un
                  if (item.id < 10 && event.container.data.some(i => i.id < 10)) {
                    this.fusionItem(champion, item);
                    event.previousContainer.data.splice(event.previousIndex, 1);
                  }
                  else {
                    //transfers les items de myItems vers les item equippé du champion
                    transferArrayItem(
                      event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex,
                      );
                    }
                  }
                  //TODO degueulasse a refaire
                  champion.equippedItems.forEach(i => this.checkItemisGood(i, champion));
                  champion.recommandedItems.forEach((it, index) => {
                    if (it.name == item.name) champion.recommandedItems.splice(index, 1);
                  });
                }
                
                setItemGlow(): void {
                  this.myChampions?.forEach(champ => {
                    champ.recommandedItems?.forEach(recoItem => {
                      recoItem.isGlowing = false;
                      //pour chaques item recommandés du champion
                      var arrayTemp = this.myItems.map(i => i.name)
                      //verification si l'item recommandé est directement présent
                      if (arrayTemp.includes(recoItem.name)) {
                        
                        recoItem.isGlowing = true;
                      }
                      else {
                        //vérification si pour chaques item reco j'ai un item equipé + item
                        if (recoItem.recipe?.some(itemr => champ.equippedItems?.some(iteme => iteme.name == itemr.name))
                        && recoItem.recipe?.some(itemr2 => this.myItems?.some(myitem => myitem.name == itemr2.name))) {
                          recoItem.isGlowing = true;
                        }
                        
                        //vérification si les 2 items d'un item reco sont présent
                        if (this.checkDoubleItemInMyItem(recoItem.recipe)) {
                          recoItem.isGlowing = true;
                        }
                        //vérification si 1 item est présent
                        for (let i = 0; i < recoItem.recipe?.length; i++) {
                          const itemRecipe = recoItem.recipe[i];
                          itemRecipe.isGlowing = false;
                          if (arrayTemp.includes(itemRecipe.name)) {
                            itemRecipe.isGlowing = true;
                            //controle pour n'afficher qu'n élément si 2 sont nécessaire
                            if (i > 0 && recoItem.recipe[0].name == recoItem.recipe[1].name) {
                              itemRecipe.isGlowing = false;
                            }
                          }
                        }
                      }
                    });
                  });
                }
                
                checkDoubleItemInMyItem(recipe: Item[]): boolean {
                  var numInside: number = 0;
                  var arrayTemp = this.myItems.map(i => i.name)
                  recipe?.forEach(element => {
                    var indexItem = arrayTemp.indexOf(element.name);
                    if (indexItem > -1) {
                      numInside++;
                      arrayTemp.splice(indexItem, 1);
                    }
                  });
                  return numInside >= 2;
                }
                
                checkItemisGood(item: Item, champion: Champion): boolean {
                  item.isWrong = !champion.recommandedItems.some(i => i.name == item.name || i.recipe.some(ri => ri.name == item.name));
                  return item.isWrong;
                }
                
                checkCraftableItem(): void {
                  this.craftableItems = [];
                  //récupération dans mesitems de tout les id inférieur a 10 dans une liste
                  //additions de tous ces ids suivant la règle du chiffre des unité supérieur aux dizaines
                  //ajout dans la liste sans doublons (verification sur l'id)
                  var allItemsId = this.myItems.filter(it => it.id < 10);
                  var additionId: string[] = [];
                  
                  for (let index = 0; index < allItemsId.length; index++) {
                    const currItem = allItemsId[index];
                    /*var otherItemsArray = allItemsId.slice(allItemsId.indexOf(currId),1);*/
                    
                    for (let iotherItems = allItemsId.indexOf(currItem) + 1; iotherItems < allItemsId.length; iotherItems++) {
                      const otherId = allItemsId[iotherItems].id;
                      var newId: string;
                      if (currItem.id <= otherId) { //le second chiffre de l'id est toujours égale ou supérieur au premier
                        newId = `${currItem.id}${otherId}`;
                      }
                      else {
                        newId = `${otherId}${currItem.id}`;
                      }
                      if (!additionId.some(id => id == newId)) {
                        additionId.push(newId);
                      }
                    }
                  }
                  additionId.forEach(id => {
                    var itemFus = this.itemService.getById(+id).subscribe(
                      itemFus => {
                        if (itemFus) {
                          this.craftableItems.push(itemFus);
                        }
                        
                      });
                    });
                  }
                  
                  fusionItem(champion: Champion, itemToFus: Item) {
                    //prends le premiere item simple des item equipés du champion
                    var item = champion.equippedItems.filter(i => i.id < 10)[0];
                    //recuperation de l'id de cet item + de l'item courant
                    var newId = "";
                    if (item.id <= itemToFus.id) { //le second chiffre de l'id est toujours égale ou supérieur au premier
                      newId = `${item.id}${itemToFus.id}`;
                    }
                    else {
                      newId = itemToFus.id.toString() + item.id.toString();
                    }
                    
                    //recuperation d'un item avec cette id
                    this.itemService.getById(+newId).subscribe(
                      itemFus => {
                        if (itemFus) {
                          //suppression des 2 item equipé et ajout de celui fusionné
                          champion.equippedItems.splice(champion.equippedItems.indexOf(item), 1);
                          champion.equippedItems.push(itemFus);
                        }
                      }
                      );
                    }
                  }
                  
                  