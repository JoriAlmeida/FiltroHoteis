import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel';

@Component({
  selector: 'app-buscar-hoteis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscarHoteis.html',
  styleUrl: './buscarHoteis.scss'
})
export class BuscaHoteis implements OnInit {

  destinoSelecionado = false;

  hoteis: Hotel[] = [];
  hoteisFiltrados: Hotel[] = [];

  textoBusca = '';

  constructor(
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.carregarHoteis();
  }

  carregarHoteis(): void {

    this.hotelService.listarHoteis().subscribe({
      next: (dados) => {
        this.hoteis = dados;
      },

      error: (erro) => {
        console.error(
          'Erro ao carregar o JSON:',
          erro
        );
      }
    });

  }

  buscarHotel(): void {

    const texto =
      this.normalizarTexto(
        this.textoBusca
      );

    if (!texto) {
      this.hoteisFiltrados = [];
      return;
    }

    this.hoteisFiltrados =
      this.hoteis.filter((hotel) =>
        this.normalizarTexto(
          hotel.NOME
        ).includes(texto)
      );

  }

  normalizarTexto(
    texto: string
  ): string {

    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  }

  selecionarHotel(
    hotel: Hotel
  ): void {

    this.textoBusca = hotel.NOME;

    this.hoteisFiltrados = [];

    this.destinoSelecionado = false;

  }

}