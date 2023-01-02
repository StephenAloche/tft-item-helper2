import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckManagerRoutingModule } from './deck-manager-routing.module';
import { DeckManagerComponent } from './pages/deck-manager.component';
import { ActiveTraitsModule } from '../../shared/components/traits/active-traits/active-traits.module';
import { DeckLineComponent } from './deck-line/deck-line.component';
import { ChampionPicModule } from 'src/app/shared/components/champion/champion-pic/champion-pic.module';
import { ChampionListModule } from 'src/app/shared/components/champion/champion-list/champion-list.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DeckLineComponent,
    DeckManagerComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DeckManagerRoutingModule,
    ActiveTraitsModule,
    ChampionPicModule,
    ChampionListModule,

    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DeckManagerModule { }
