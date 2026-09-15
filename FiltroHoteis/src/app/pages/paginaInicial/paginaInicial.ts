import { Component } from '@angular/core';

import { BuscaHoteis } from '../../components/buscarHoteis/buscarHoteis';
import { Calendario } from '../../components/calendario/calendario';
import { Hospedes } from '../../components/hospedes/hospedes';
import { Quarto } from '../../interfaces/quarto';
import { BuscaService } from '../../services/busca.service';
import { Router } from '@angular/router';



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
  dataEntrada: Date | null = null;
  dataSaida: Date | null = null;
  quartosSelecionados: Quarto[] = [];
  hotelSelecionadoId: number | null = null;

  receberDatas(datas: {
    entrada: Date;
    saida: Date;
  }): void {

    this.dataEntrada = datas.entrada;
    this.dataSaida = datas.saida;

    this.buscaService.dataEntrada = datas.entrada;
    this.buscaService.dataSaida = datas.saida;

    console.log('Data de entrada:', this.dataEntrada);
    console.log('Data de saída:', this.dataSaida);
  }

  receberHospedes(quartos: Quarto[]): void {

    this.quartosSelecionados = quartos;

    this.buscaService.quartos = quartos;

    console.log('Hóspedes selecionados:', this.quartosSelecionados);

  }


  receberHotel(id: number): void {

    this.hotelSelecionadoId = id;

    this.buscaService.hotelId = id;

    console.log(
      'ID do hotel recebido na página inicial:',
      this.hotelSelecionadoId
    );
  }

  constructor(
    private buscaService: BuscaService,
    private router: Router
  ) { }

  buscar(): void {
    this.router.navigate(['/hoteis']);
  }
}