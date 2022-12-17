import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionTileComponent } from './champion-tile.component';

@NgModule({
  declarations: [
    ChampionTileComponent
  ],
  imports: [
    CommonModule,    
  ],
  exports: [
    ChampionTileComponent,
  ]
})
export class ChampionTileModule { }