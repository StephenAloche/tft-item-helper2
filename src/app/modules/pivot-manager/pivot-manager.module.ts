import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSliderModule} from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PivotManagerRoutingModule } from './pivot-manager-routing.module';
import { PivotManagerComponent } from './pages/pivot-manager.component';
import { ChampionListModule } from 'src/app/shared/components/champion/champion-list/champion-list.module';
import { ChampionTileModule } from 'src/app/shared/components/champion/champion-tile/champion-tile.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardModule } from './components/board/board.module';
import { ChampionHexagoneModule } from 'src/app/shared/components/champion/champion-hexagone/champion-hexagone.module';
import { ActiveTraitsModule } from '../../shared/components/traits/active-traits/active-traits.module';


@NgModule({
  declarations: [
    PivotManagerComponent
  ],
  imports: [
    CommonModule,
    BoardModule,
    ActiveTraitsModule,
    ChampionHexagoneModule,
    PivotManagerRoutingModule,
    ChampionListModule,
    ChampionTileModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    PivotManagerComponent
  ]
})
export class PivotManagerModule { }
