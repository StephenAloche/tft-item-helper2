import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './pages/guide/guide.component';
import { PatchNotesComponent } from './pages/patch-notes/patch-notes.component';


@NgModule({
  declarations: [
    GuideComponent,
    PatchNotesComponent
  ],
  imports: [
    CommonModule,
    GuideRoutingModule
  ],
  exports: [    
    GuideComponent,
    PatchNotesComponent
  ]
})
export class GuideModule { }
