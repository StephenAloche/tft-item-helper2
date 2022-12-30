import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionTooltipComponent } from './champion-tooltip.component';



@NgModule({
  declarations: [
    ChampionTooltipComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[    
    ChampionTooltipComponent
  ]
})
export class ChampionTooltipModule { }
