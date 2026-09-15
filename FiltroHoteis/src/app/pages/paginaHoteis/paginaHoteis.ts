import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscaService } from '../../services/busca.service';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel';
import { Quarto } from '../../interfaces/quarto';
import { MenuPesquisa } from '../../components/meuPesquisa/menuPesquisa';
import { CardHotel } from '../../components/cardHotel/cardHotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-hoteis',
  imports: [CommonModule,
    MenuPesquisa,
    CardHotel
  ],
  templateUrl: './paginaHoteis.html',
  styleUrl: './paginaHoteis.scss'
})
export class PaginaHoteis implements OnInit {

  hotel: Hotel | null = null;

  hotelId: number | null = null;

  dataEntrada: Date | null = null;
  dataSaida: Date | null = null;

  quartos: Quarto[] = [];

  constructor(
    private buscaService: BuscaService,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  voltarInicio(): void {
    this.router.navigate(['/']);
  }


  ngOnInit(): void {

    this.hotelId = this.buscaService.hotelId;

    this.dataEntrada = this.buscaService.dataEntrada;

    this.dataSaida = this.buscaService.dataSaida;

    this.quartos = this.buscaService.quartos;

    console.log('ID recebido:', this.hotelId);
    console.log('Entrada recebida:', this.dataEntrada);
    console.log('Saída recebida:', this.dataSaida);
    console.log('Hóspedes recebidos:', this.quartos);

    if (this.hotelId !== null) {

      this.hotelService.listarHoteis().subscribe({
        next: (hoteis) => {

          this.hotel =
            hoteis.find(hotel => hotel.ID === this.hotelId) ?? null;

          this.cdr.detectChanges();


          console.log('Hotel encontrado:', this.hotel);

        },

        error: (erro) => {

          console.error(
            'Erro ao carregar hotéis:',
            erro
          );

        }
      });

    }
  }



}

