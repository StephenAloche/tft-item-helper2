import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PivotManagerRoutingModule } from './pivot-manager-routing.module';
import { PivotManagerComponent } from './pages/pivot-manager.component';


@NgModule({
  declarations: [
    PivotManagerComponent
  ],
  imports: [
    CommonModule,
    PivotManagerRoutingModule
  ],
  exports:[
    PivotManagerComponent
  ]
})
export class PivotManagerModule { }
