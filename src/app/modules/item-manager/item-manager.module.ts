import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemManagerRoutingModule } from './item-manager-routing.module';
import { ItemManagerComponent } from './pages/item-manager/item-manager.component';
import { ChampionListModule } from 'src/app/shared/components/champion-list/champion-list.module';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    ItemManagerComponent,
  ],
  imports: [
    CommonModule,
    ItemManagerRoutingModule,
    ChampionListModule,
    TooltipModule,
  ],
  exports : [
    ItemManagerComponent
  ]

})
export class ItemManagerModule { }
