import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from 'src/app/shared/services/item.service';
import { CHAMPION_IMG_URL, ITEM_IMG_URL, ITEM_SPAT_IMG_URL, TRAIT_IMG_URL } from 'src/assets/const-path-img';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit{
  ITEM_IMG_URL = ITEM_IMG_URL;
  ITEM_SPAT_IMG_URL = ITEM_SPAT_IMG_URL;
  CHAMPION_IMG_URL = CHAMPION_IMG_URL;
  TRAIT_IMG_URL = TRAIT_IMG_URL;

  @Output() selectItem = new EventEmitter();
  items: Item[] = [];
  itemsComble: Item[] = [];

  constructor(
    private itemService: ItemService
    ) {

  }
  
  ngOnInit(): void {
        
    this.itemService.getAll()?.subscribe(items => {
      this.items = items
      this.itemsComble = this.items.filter(i => i.id < 10);
    }
    );
  }
  
  selectItemChild(item: Item): void {
    this.selectItem.emit(item);
  }


}
