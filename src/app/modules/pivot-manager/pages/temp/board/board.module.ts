import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardComponent } from './board.component';
import { ChampionHexagoneModule } from '../../champion/champion-hexagone/champion-hexagone.module';

@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    ChampionHexagoneModule,
    CommonModule
  ],
  exports : [
    BoardComponent
  ],
})
export class BoardModule { }
