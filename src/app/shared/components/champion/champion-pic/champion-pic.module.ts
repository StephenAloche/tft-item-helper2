import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionPicComponent } from './champion-pic.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ChampionTooltipModule } from '../champion-tooltip/champion-tooltip.module';

@NgModule({
  declarations: [
    ChampionPicComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    ChampionTooltipModule
  ],
  exports :[    
    ChampionPicComponent
  ]
})
export class ChampionPicModule { }
