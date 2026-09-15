import { Injectable } from '@angular/core';
import { Quarto } from '../interfaces/quarto';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  hotelId: number | null = null;

  dataEntrada: Date | null = null;

  dataSaida: Date | null = null;

  quartos: Quarto[] = [];

}

