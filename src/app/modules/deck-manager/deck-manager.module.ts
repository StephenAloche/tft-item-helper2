import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckManagerRoutingModule } from './deck-manager-routing.module';
import { DeckManagerComponent } from './pages/deck-manager.component';
import { ActiveTraitsModule } from '../pivot-manager/components/active-traits/active-traits.module';
import { DeckLineComponent } from './deck-line/deck-line.component';
import { ChampionPicModule } from 'src/app/shared/components/champion/champion-pic/champion-pic.module';
import { ChampionListModule } from 'src/app/shared/components/champion/champion-list/champion-list.module';

@NgModule({
  declarations: [
    DeckLineComponent,
    DeckManagerComponent
  ],
  imports: [
    CommonModule,
    DeckManagerRoutingModule,
    ActiveTraitsModule,
    ChampionPicModule,
    ChampionListModule
  ]
})
export class DeckManagerModule { }
