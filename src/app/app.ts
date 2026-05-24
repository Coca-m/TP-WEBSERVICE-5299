import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Necesario para cargar los componentes de las rutas
import { Navbar } from './components/navbar/navbar'; // Tu objeto Navbar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    Navbar // Registramos tu Navbar para que el HTML principal lo dibuje con sus estilos
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Tu clase principal limpia
}
