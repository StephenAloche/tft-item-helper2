import { Component } from '@angular/core';
import { ItemService } from './shared/services/item.service';
import { SetService } from './shared/services/set.service';
import { TraitService } from './shared/services/trait.service';

export const currentSetNum : number = 8;
export const currentpatchNum : string = "12.17";
export const ITEM_IMG_URL = "/assets/tft_items_pics/"
export const ITEM_SPAT_IMG_URL = `/assets/dataSets/Set${currentSetNum}/tft${currentSetNum}_trait_spat_pics/`
export const CHAMPION_IMG_URL = `/assets/dataSets/Set${currentSetNum}/tft${currentSetNum}_champ_pics/`
export const TRAIT_IMG_URL = `/assets/dataSets/Set${currentSetNum}/tft${currentSetNum}_trait_pics/`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tft-itemManager';
  
  constructor(private setService: SetService,private itemService: ItemService,private traitService: TraitService) { }
  
  ngOnInit(): void {
    this.setService.LoadSetData().subscribe();
    this.itemService.loadItems();
    this.traitService.getAll().subscribe();

  }  
}
