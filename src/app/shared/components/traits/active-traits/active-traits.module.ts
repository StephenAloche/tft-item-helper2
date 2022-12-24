import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTraitsComponent } from './active-traits.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ChampionPicModule } from '../../champion/champion-pic/champion-pic.module';



@NgModule({
  declarations: [
    ActiveTraitsComponent],
    imports: [
      CommonModule,    
      TooltipModule,
      MatTooltipModule,  
      ChampionPicModule
    ],
    exports : [
      ActiveTraitsComponent
    ]
  })
  export class ActiveTraitsModule { }
  