import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit{
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
