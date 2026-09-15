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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CardHotel recebeu:', this.hotel);
  }
}