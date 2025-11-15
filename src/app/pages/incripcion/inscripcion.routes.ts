import { Routes } from '@angular/router';
import { IncripcionComponent } from './incripcion.component';

export const InscripcionRoutes: Routes = [
  {
    path: '',
    component: IncripcionComponent,
    data: {
      title: 'Inscripcion',
      urls: [
        { title: 'Isscripcion', url: '/resultadoproyeccion' },
      ],
    }
  },

];
