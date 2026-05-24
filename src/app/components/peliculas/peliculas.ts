import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 👈 1. Añadimos ChangeDetectorRef aquí
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../services/peliculas';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.html',
  styleUrls: ['./peliculas.css']
})
export class Peliculas implements OnInit {
  listaPeliculas: any[] = [];
  cargando: boolean = true;

  // 👈 2. Inyectamos cdr en el constructor de forma privada
  constructor(
    private peliculasService: PeliculasService,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(): void {
    this.peliculasService.getTopMovies().subscribe({
      next: (data) => {
        this.listaPeliculas = data;
        this.cargando = false; // Cambiamos el estado
        
        // 👈 3. OBLIGATORIO: Forzamos a Angular a redibujar la pantalla AHORA
        this.cdr.detectChanges(); 
        
        console.log('Películas cargadas con éxito:', this.listaPeliculas);
      },
      error: (err) => {
        console.error('Error al consumir la API de películas:', err);
        this.cargando = false;
        this.cdr.detectChanges(); // También forzamos el redibujado en caso de error
      }
    });
  }
}