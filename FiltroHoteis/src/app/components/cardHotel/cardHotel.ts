import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Hotel } from '../../interfaces/hotel';

@Component({
  selector: 'app-card-hotel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardHotel.html',
  styleUrl: './cardHotel.scss'
})
export class CardHotel implements OnChanges {

  @Input() hotel: Hotel | null = null;
  @Input() dataEntrada: Date | null = null;
  @Input() dataSaida: Date | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CardHotel recebeu:', this.hotel);
  }

  quantidadeNoites(): number {
    if (!this.dataEntrada || !this.dataSaida) {
      return 0;
    }

    const entrada = new Date(this.dataEntrada);
    const saida = new Date(this.dataSaida);

    entrada.setHours(0, 0, 0, 0);
    saida.setHours(0, 0, 0, 0);

    const diferenca =
      saida.getTime() - entrada.getTime();

    return Math.max(
      0,
      Math.floor(diferenca / (1000 * 60 * 60 * 24))
    );
  }

  valorTotal(): number {
    if (!this.hotel) {
      return 0;
    }

    const noites = this.quantidadeNoites();

    // Para teste, caso as datas não cheguem,
    // mostra pelo menos o valor do hotel
    if (noites === 0) {
      return this.hotel.VALOR;
    }

    return this.hotel.VALOR * noites;
  }


  imagemHotel(): string {

    if (!this.hotel) {
      return '';
    }

    const imagens: { [key: number]: string } = {

      1: 'VILLAGEARRAIALBYMNHOTEIS.PNG',
      2: 'POUSADARECANTOTRANCOSO.PNG',
      3: 'PortoSeguroPraiaResortAllInclusive.PNG',
      4: 'PortobelloParkHotel.PNG',
      5: 'HotelCoroaVermelhaBeach.PNG',
      6: 'NAUTICOMARRESORTALLINCLUSIVE&BEACHCLUB.PNG',
      7: 'VilaGaleRioDeJaneiro.PNG',
      8: 'QualityRioDeJaneiroBarraDaTijuca.PNG',
      9: 'WyndhamRioBarra.PNG',
      10: 'HotelGoldenParkRioDeJaneiroAeroportoByNacionalInn.PNG',
      11: 'MERCURERJBARRADATIJUCA.PNG',
      12: 'TransamericaExecutiveNovaPaulista.PNG',
      13: 'HotelIntercityPaulista.PNG',
      14: 'VilaGalePaulista.PNG',
      15: 'ESUITESCONGONHASBYATLANTICA.PNG',
      16: 'IbisSãoPauloBarraFunda.PNG',
      17: 'HOTELINTERCITYSALVADORAEROPORTO.PNG',
      18: 'VilaGaleSalvador.PNG',
      19: 'PortobelloOndinaPraiaHotel.PNG',
      20: 'HotelDanInnExpressSalvadorByNacionalInn.PNG',
      21: 'BHOTEL.PNG'

    };

    return `/imagens/${imagens[this.hotel.ID]}`;

  }


}