import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  // API pública para generación de códigos QR
  private apiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=';

  constructor(private http: HttpClient) { }

  obtenerEnlaceQR(texto: string): string {
    return `${this.apiUrl}${encodeURIComponent(texto)}`;
  }
}