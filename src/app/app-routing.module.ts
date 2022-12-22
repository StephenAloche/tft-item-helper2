import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './modules/accueil/pages/accueil/accueil.component';

const routes: Routes = [  
  { path: '', 
  loadChildren: () => import('./modules/accueil/accueil.module').then(mod => mod.AccueilModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./modules/accueil/accueil.module').then(mod => mod.AccueilModule)
  },
  {
    path: 'itemManager',
    loadChildren: () => import('./modules/item-manager/item-manager.module').then(mod => mod.ItemManagerModule)
  },
  {
    path: 'championManager',
    loadChildren: () => import('./modules/champion-manager/champion-manager.module').then(mod => mod.ChampionManagerModule)
  },
  {
    path: 'pivotManager',
    loadChildren: () => import('./modules/pivot-manager/pivot-manager.module').then(mod => mod.PivotManagerModule)
  },
  {
    path: 'traitManager',
    loadChildren: () => import('./modules/trait-manager/trait-manager.module').then(mod => mod.TraitManagerModule)
  },
  {
    path: 'deckManager',
    loadChildren: () => import('./modules/deck-manager/deck-manager.module').then(mod => mod.DeckManagerModule)
  },
  {
    path: 'guide',
    loadChildren: () => import('./modules/guide/guide.module').then(mod => mod.GuideModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
