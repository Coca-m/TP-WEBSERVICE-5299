import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AudiotextoService } from '../../services/audiotexto';

@Component({
  selector: 'app-audiotexto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-to-speech.html',
  styleUrls: ['./text-to-speech.css']
})
export class Audiotexto {
  textoUsuario: string = '';
  vozSeleccionada: string = 'alloy';
  audioUrl: SafeUrl | null = null;
  
  cargando: boolean = false;
  errorMensaje: string = '';

  listaVoces = [
    { id: 'alloy', nombre: 'Alloy (Neutro Universal)' },
    { id: 'echo', nombre: 'Echo (Voz Masculina Firme)' },
    { id: 'nova', nombre: 'Nova (Voz Femenina Enérgica)' },
    { id: 'shimmer', nombre: 'Shimmer (Voz Femenina Clara)' }
  ];

  @ViewChild('reproductorAudio') reproductor!: ElementRef<HTMLAudioElement>;

  constructor(
    private audioService: AudiotextoService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  generarAudio(): void {
    if (!this.textoUsuario.trim()) {
      this.errorMensaje = 'Por favor, ingrese un texto para convertir.';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';
    this.audioUrl = null; 
    this.cdr.detectChanges();

    this.audioService.convertirTextoAVoz(this.textoUsuario, this.vozSeleccionada).subscribe({
      next: (blob: Blob) => {
        // 1. Creamos el blob forzando el tipo mpeg que maneja OpenAI en su raíz
        const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
        const urlObjeto = URL.createObjectURL(audioBlob);
        
        // 2. Le asignamos la URL segura a la propiedad para que se muestre el control en el HTML
        this.audioUrl = this.sanitizer.bypassSecurityTrustUrl(urlObjeto);
        this.cargando = false;
        this.cdr.detectChanges();

        // 3. 💥 EL REMATE: Le metemos la URL cruda directamente al elemento de HTML5 y lo cargamos a la fuerza
        setTimeout(() => {
          if (this.reproductor && this.reproductor.nativeElement) {
            const htmlAudio = this.reproductor.nativeElement;
            htmlAudio.src = urlObjeto; // Bypass directo al elemento de renderizado
            htmlAudio.load();          // Fuerza al navegador a leer el búfer físico
            console.log('Búfer multimedia cargado con éxito.');
          }
        }, 50);
      },
      error: (err) => {
        console.error('Error al generar el audio TTS:', err);
        this.errorMensaje = 'No se pudo conectar con el servidor de voz.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}