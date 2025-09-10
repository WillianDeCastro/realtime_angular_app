import { Routes } from '@angular/router';
import { ProdutoListComponent } from './produto-list/produto-list.component';

export const routes: Routes = [
  {
    path: 'produto',
    component: ProdutoListComponent
  },
  {
    path: '',
    redirectTo: 'produto',
    pathMatch: 'full'
  }
];
