import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionListComponent } from './champion-list.component';

@NgModule({
  declarations: [
    ChampionListComponent
  ],
  imports: [
    CommonModule,    
  ],
  exports: [
    ChampionListComponent,
  ]
})
export class ChampionListModule { }