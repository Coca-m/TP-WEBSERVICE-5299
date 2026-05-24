import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Importante para usar [(ngModel)]
import { CambioService } from '../../services/cambio';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Inyectamos FormsModule aquí
  templateUrl: './conversor.html',
  styleUrls: ['./conversor.css']
})
export class Conversor implements OnInit {
  monto: number = 1;
  monedaOrigen: string = 'USD';
  monedaDestino: string = 'ARS';
  resultado: number | null = null;
  
  cargando: boolean = false;
  errorMensaje: string = '';

  // Lista de las monedas más comunes y operadas en el mercado para los select
  listaMonedas: string[] = ['USD', 'ARS', 'EUR', 'BRL', 'CLP', 'UYU', 'GBP', 'MXN', 'JPY'];

  constructor(
    private cambioService: CambioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.ejecutarConversion();
  }

  ejecutarConversion(): void {
    if (!this.monto || this.monto <= 0) {
      this.resultado = 0;
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';
    this.cdr.detectChanges();

    // Consumimos el servicio HTTP real
    this.cambioService.ObtenerTasas(this.monedaOrigen).subscribe({
      next: (response) => {
        if (response && response.rates) {
          const tasa = response.rates[this.monedaDestino.toUpperCase()];
          
          if (tasa) {
            // Calculamos el monto final multiplicado por la tasa de cambio del servidor
            this.resultado = this.monto * tasa;
          } else {
            this.errorMensaje = 'No se encontró la tasa de cambio para la moneda destino.';
          }
        }
        this.cargando = false;
        this.cdr.detectChanges(); // Forzamos el renderizado del resultado en modo claro
      },
      error: (err) => {
        console.error('Error al cotizar divisas:', err);
        this.errorMensaje = 'Hubo un error al conectar con el servidor de divisas.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}