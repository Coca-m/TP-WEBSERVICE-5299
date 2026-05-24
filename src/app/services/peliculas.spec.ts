import { TestBed } from '@angular/core/testing';
import { PeliculasService } from './peliculas'; // 👈 Cambialo para que importe tu servicio real

describe('PeliculasService', () => {
  let service: PeliculasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});