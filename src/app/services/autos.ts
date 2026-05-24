import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  // Endpoints oficiales de la base de datos gubernamental NHTSA
  private urlMarcas = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';

  constructor(private http: HttpClient) { }

  // 1. Consume el servicio web para traer la lista global de marcas
  getCarMakes(): Observable<any> {
    return this.http.get<any>(this.urlMarcas);
  }

  // 2. Trae los modelos correspondientes filtrados por el nombre de la marca elegida
  getModelsByMake(makeName: string): Observable<any> {
    const urlModelos = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${makeName}?format=json`;
    return this.http.get<any>(urlModelos);
  }
}