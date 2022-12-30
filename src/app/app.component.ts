import { Component } from '@angular/core';
import { ItemService } from './shared/services/item.service';
import { SetService } from './shared/services/set.service';
import { TraitService } from './shared/services/trait.service';

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

export const currentSetNum : number = 8;
export const currentpatchNum : string = "12.17";