import { Routes } from '@angular/router';
import { Peliculas} from './components/peliculas/peliculas';
import { Autos} from './components/autos/autos';
import { Conversor } from './components/conversor/conversor';
import { Audiotexto } from './components/text-to-speech/text-to-speech';
import { ApiLibre } from './components/api-libre/api-libre';

export const routes: Routes = [
  { path: 'peliculas', component: Peliculas },
  { path: 'autos', component: Autos },
  { path: 'conversor', component: Conversor },
  { path: 'text-to-speech', component: Audiotexto },
  { path: 'api-libre', component: ApiLibre },
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' }, // Ruta por defecto [cite: 12]
  { path: '**', redirectTo: '/peliculas' } // Comodín por si escriben cualquier cosa
];