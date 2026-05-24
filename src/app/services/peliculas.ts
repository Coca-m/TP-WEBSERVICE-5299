import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  // URL de referencia dada por la cátedra
  private apiUrl = 'https://imdb-top-100-movies.p.rapidapi.com/'; 

  constructor(private http: HttpClient) { }

  getTopMovies(): Observable<any[]> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': '7b548371b1mshb5d5eaf55b655b9p117359jsn2aaaa01c5ec6', 
    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
  });

  return this.http.get<any[]>(this.apiUrl, { headers });
}
}