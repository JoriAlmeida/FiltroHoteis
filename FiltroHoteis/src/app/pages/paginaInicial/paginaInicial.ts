import { Component } from '@angular/core';

import { BuscaHoteis } from '../../components/buscarHoteis/buscarHoteis';
import { Calendario } from '../../components/calendario/calendario';
import { Hospedes } from '../../components/hospedes/hospedes';

@Component({
  selector: 'app-pagina-inicial',
  imports: [
    BuscaHoteis,
    Calendario,
    Hospedes
  ],
  templateUrl: './paginaInicial.html',
  styleUrl: './paginaInicial.scss'
})
export class PaginaInicial {

}