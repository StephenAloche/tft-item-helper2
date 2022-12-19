import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionItemsListComponent } from './champion-items-list.component';
import { TooltipModule } from 'ng2-tooltip-directive';



@NgModule({
  declarations: [
    ChampionItemsListComponent
  ],
  imports: [
    TooltipModule,
    
    CommonModule
  ],
exports : [
  ChampionItemsListComponent
]
})
export class ChampionItemsListModule{
}
