import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private readonly url = '/data/hoteis.json';

  constructor(private http: HttpClient) {}

  listarHoteis(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url);
  }
}