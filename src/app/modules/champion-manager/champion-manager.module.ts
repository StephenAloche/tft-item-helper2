import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChampionManagerRoutingModule } from './champion-manager-routing.module';
import { ChampionManagerComponent } from './pages/champion-manager/champion-manager.component';


@NgModule({
  declarations: [
    ChampionManagerComponent
  ],
  imports: [
    CommonModule,
    ChampionManagerRoutingModule
  ]
})
export class ChampionManagerModule { }
