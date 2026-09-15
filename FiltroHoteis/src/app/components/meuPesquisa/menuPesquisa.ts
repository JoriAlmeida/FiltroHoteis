import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Hotel } from '../../interfaces/hotel';
import { Quarto } from '../../interfaces/quarto';

@Component({
  selector: 'app-menu-pesquisa',
  standalone: true,
  imports: [],
  templateUrl: './menuPesquisa.html',
  styleUrl: './menuPesquisa.scss'
})
export class MenuPesquisa implements OnChanges {

  @Input() hotel: Hotel | null = null;

  @Input() dataEntrada: Date | null = null;

  @Input() dataSaida: Date | null = null;

  @Input() quartos: Quarto[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    console.log('MenuPesquisa recebeu:', this.hotel);
  }
}