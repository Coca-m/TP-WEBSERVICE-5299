import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrService } from '../../services/qr';

@Component({
  selector: 'app-api-libre',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './api-libre.html',
  styleUrls: ['./api-libre.css']
})
export class ApiLibre {
  textoIngresado: string = 'https://github.com'; // Valor inicial
  qrResultadoUrl: string | null = null;
  cargando: boolean = false;

  constructor(
    private qrService: QrService,
    private cdr: ChangeDetectorRef
  ) { }

  generarCodigoQR(): void {
    if (!this.textoIngresado.trim()) return;

    this.cargando = true;
    this.qrResultadoUrl = null;
    this.cdr.detectChanges();

    // Pequeño delay de red simulado para el spinner visual
    setTimeout(() => {
      this.qrResultadoUrl = this.qrService.obtenerEnlaceQR(this.textoIngresado);
      this.cargando = false;
      this.cdr.detectChanges();
      console.log('Código QR generado para el componente api-libre:', this.qrResultadoUrl);
    }, 600);
  }
}
