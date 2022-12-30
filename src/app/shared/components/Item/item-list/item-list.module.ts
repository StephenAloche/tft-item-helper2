import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ChampionTooltipModule } from '../../champion/champion-tooltip/champion-tooltip.module';

@NgModule({
  declarations: [
    ItemListComponent
  ],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports: [
    ItemListComponent
  ]
})
export class ItemListModule { }
