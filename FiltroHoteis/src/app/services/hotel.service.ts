import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hotel } from '../interfaces/hotel';
import { Quarto } from '../interfaces/quarto';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private readonly url = '/data/hoteis.json';

  constructor(private http: HttpClient) { }

  listarHoteis(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url);
  }


}

export class BuscaService {

  hotelId: number | null = null;

  dataEntrada: Date | null = null;

  dataSaida: Date | null = null;

  quartos: Quarto[] = [];

}