import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosService } from '../../services/autos';

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autos.html',
  styleUrls: ['./autos.css']
})
export class Autos implements OnInit {
  listaMarcas: any[] = [];
  listaModelos: any[] = [];
  marcaSeleccionada: any = null;
  
  cargandoMarcas: boolean = true;
  cargandoModelos: boolean = false;

  constructor(
    private autosService: AutosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas(): void {
    this.autosService.getCarMakes().subscribe({
     next: (response) => {
  if (response && response.Results) {
    // Lista de marcas populares para filtrar la enorme base de datos
    const marcasPopulares = ['FORD', 'RENAULT', 'CHEVROLET', 'FIAT', 'TOYOTA', 'VOLKSWAGEN', 'HONDA', 'NISSAN', 'BMW', 'AUDI', 'MERCEDES-BENZ', 'FERRARI', 'TESLA', 'HYUNDAI', 'PORSCHE', 'PEUGEOT'];
    
    // Filtramos para quedarnos solo con las que coincidan con nuestra lista
    this.listaMarcas = response.Results.filter((m: any) => 
      marcasPopulares.includes(m.Make_Name.toUpperCase())
    );
  }
  this.cargandoMarcas = false;
  this.cdr.detectChanges();
  console.log('Marcas filtradas con éxito:', this.listaMarcas);
},
      error: (err) => {
        console.error('Error al conectar con la API de autos:', err);
        this.cargandoMarcas = false;
        this.cdr.detectChanges();
      }
    });
  }

  seleccionarMarca(marca: any): void {
    this.marcaSeleccionada = marca;
    this.listaModelos = [];
    this.cargandoModelos = true;
    this.cdr.detectChanges();

    // Obtenemos el nombre de la marca (ej: "Tesla", "Ford", "Aston Martin")
    const nombreMarca = marca.Make_Name;

    this.autosService.getModelsByMake(nombreMarca).subscribe({
      next: (response) => {
        if (response && response.Results) {
          this.listaModelos = response.Results;
        }
        this.cargandoModelos = false;
        this.cdr.detectChanges();
        console.log(`Modelos de ${nombreMarca} cargados con éxito:`, this.listaModelos);
      },
      error: (err) => {
        console.error('Error al traer los modelos de la marca:', err);
        this.cargandoModelos = false;
        this.cdr.detectChanges();
      }
    });
  }
}