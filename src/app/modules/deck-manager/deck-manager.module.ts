import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckManagerRoutingModule } from './deck-manager-routing.module';
import { DeckManagerComponent } from './pages/deck-manager.component';
import { ActiveTraitsModule } from '../pivot-manager/components/active-traits/active-traits.module';
import { DeckLineComponent } from './deck-line/deck-line.component';

@NgModule({
  declarations: [
    DeckLineComponent,
    DeckManagerComponent
  ],
  imports: [
    CommonModule,
    DeckManagerRoutingModule,
    ActiveTraitsModule
  ]
})
export class DeckManagerModule { }
