import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionListComponent } from './champion-list.component';
import { ChampionPicModule } from '../champion-pic/champion-pic.module';

@NgModule({
  declarations: [
    ChampionListComponent
  ],
  imports: [
    CommonModule,
    ChampionPicModule
  ],
  exports: [
    ChampionListComponent,
  ]
})
export class ChampionListModule { }