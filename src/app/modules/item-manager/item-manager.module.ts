import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ItemManagerRoutingModule } from './item-manager-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TooltipModule } from 'ng2-tooltip-directive';

import { ItemManagerComponent } from './pages/item-manager/item-manager.component';
import { ChampionListModule } from 'src/app/shared/components/champion/champion-list/champion-list.module';
import { ChampionTileModule } from 'src/app/shared/components/champion/champion-tile/champion-tile.module';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    ItemManagerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,

    ItemManagerRoutingModule,
    ChampionListModule,
    ChampionTileModule,
    FontAwesomeModule,
    TooltipModule,
    DragDropModule,
  ],
  exports: [
    ItemManagerComponent
  ]

})
export class ItemManagerModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashCan);
  }
 }
