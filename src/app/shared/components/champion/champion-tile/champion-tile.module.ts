import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionTileComponent } from './champion-tile.component';
import { ChampionTooltipModule } from '../champion-tooltip/champion-tooltip.module';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [
    ChampionTileComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    ChampionTooltipModule
  ],
  exports: [
    ChampionTileComponent,
  ]
})
export class ChampionTileModule { }