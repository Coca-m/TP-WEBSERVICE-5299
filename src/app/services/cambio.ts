import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CambioService {
  // Usamos un endpoint público y ultra estable de ExchangeRate-API
  private apiUrl = 'https://open.er-api.com/v6/latest/';

  constructor(private http: HttpClient) { }

  // Trae las tasas de cambio tomando como base la moneda de origen (ej: USD)
  ObtenerTasas(monedaOrigen: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${monedaOrigen.toUpperCase()}`);
  }
}