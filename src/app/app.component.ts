import { Component } from '@angular/core';
import { ItemService } from './shared/services/item.service';
import { SetService } from './shared/services/set.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'tft-itemManager';
  
  constructor(private setService: SetService,private itemService: ItemService) { }
  
  ngOnInit(): void {
    this.setService.LoadSetData();
    this.itemService.loadItems()

  }  
}

export const currentSetNum : number = 8;
export const currentpatchNum : string = "12.17";