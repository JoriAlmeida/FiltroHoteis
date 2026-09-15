import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { Hotel } from '../../interfaces/hotel';
import { Quarto } from '../../interfaces/quarto';

@Component({
  selector: 'app-menu-pesquisa',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './menuPesquisa.html',
  styleUrl: './menuPesquisa.scss'
})
export class MenuPesquisa implements OnChanges {

  @Input() hotel: Hotel | null = null;

  @Input() dataEntrada: Date | null = null;

  @Input() dataSaida: Date | null = null;

  @Input() quartos: Quarto[] = [];

  totalAdultos = 0;
  totalCriancas = 0;

  ngOnChanges(changes: SimpleChanges): void {


    console.log('MenuPesquisa recebeu:', this.hotel);

    this.totalAdultos = this.quartos.reduce(
      (total, quarto) => total + quarto.adultos,
      0
    );

    this.totalCriancas = this.quartos.reduce(
      (total, quarto) => total + quarto.idadesCriancas.length,
      0
    );

  }
}