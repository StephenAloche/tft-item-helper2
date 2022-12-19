import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraitManagerRoutingModule } from './trait-manager-routing.module';
import { TraitManagerComponent } from './pages/trait-manager.component';
import { ChampionTileModule } from 'src/app/shared/components/champion/champion-tile/champion-tile.module';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ChampionItemsListModule } from 'src/app/shared/components/champion/champion-items-list/champion-items-list.module';


@NgModule({
  declarations: [
    TraitManagerComponent
  ],
  imports: [
    CommonModule,
    TraitManagerRoutingModule,
    ChampionTileModule,
    ChampionItemsListModule,
    TooltipModule,
  ]
})
export class TraitManagerModule { }
