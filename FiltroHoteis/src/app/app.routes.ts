import { Routes } from '@angular/router';
import { PaginaInicial } from './pages/paginaInicial/paginaInicial';
import { PaginaHoteis } from './pages/paginaHoteis/paginaHoteis';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicial
  },
  {
    path: 'hoteis',
    component: PaginaHoteis
  }
];