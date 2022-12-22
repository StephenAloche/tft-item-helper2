import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveTraitsComponent } from './active-traits.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TooltipModule } from 'ng2-tooltip-directive';



@NgModule({
  declarations: [
    ActiveTraitsComponent],
    imports: [
      CommonModule,    
      TooltipModule,
      MatTooltipModule,  
    ],
    exports : [
      ActiveTraitsComponent
    ]
  })
  export class ActiveTraitsModule { }
  