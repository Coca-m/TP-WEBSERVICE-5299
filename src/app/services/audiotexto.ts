import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudiotextoService {
  private apiUrl = 'https://open-ai-text-to-speech1.p.rapidapi.com/';

  constructor(private http: HttpClient) { }

  convertirTextoAVoz(texto: string, idioma: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-rapidapi-key': '7b548371b1mshb5d5eaf55b655b9p117359jsn2aaaa01c5ec6',
      'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com'
    });

    const body = {
      model: 'tts-1',
      input: texto,
      instructions: 'Speak in a lively and optimistic tone.',
      voice: idioma
    };

    // 👈 Forzamos a que Angular reciba el binario real sin intentar parsear JSON
    return this.http.post(this.apiUrl, body, { headers, responseType: 'blob' });
  }
}