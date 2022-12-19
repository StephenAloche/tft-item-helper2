import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from 'src/app/shared/layouts/main-layout/main-layout.component';
import { ChampionManagerComponent } from './pages/champion-manager/champion-manager.component';

const routes: Routes = [  {
  path : '',
  component : MainLayoutComponent,
  children: [
    { path: '', component: ChampionManagerComponent }
  ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChampionManagerRoutingModule { }
