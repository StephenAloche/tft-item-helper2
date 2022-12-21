import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/shared/layouts/main-layout/main-layout.component';
import { GuideComponent } from './pages/guide/guide.component';
import { PatchNotesComponent } from './pages/patch-notes/patch-notes.component';

const routes: Routes = [  
  {
  path : '',
  component : MainLayoutComponent,
  children: [
    { path: '', component: GuideComponent }
  ],
},
  {
  path : 'patch-notes',
  component : MainLayoutComponent,
  children: [
    { path: '', component: PatchNotesComponent }
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }
