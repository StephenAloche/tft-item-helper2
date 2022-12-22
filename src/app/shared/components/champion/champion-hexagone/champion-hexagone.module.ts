import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionHexagoneComponent } from './champion-hexagone.component';



@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    ChampionHexagoneComponent
  ],
  declarations: [
    ChampionHexagoneComponent]
})
export class ChampionHexagoneModule { }
