import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionPicComponent } from './champion-pic.component';

@NgModule({
  declarations: [
    ChampionPicComponent
  ],
  imports: [
    CommonModule
  ],
  exports :[    
    ChampionPicComponent
  ]
})
export class ChampionPicModule { }
