import { Routes } from '@angular/router';
import { VisorComponent } from './visor.component';

export const VisorRoutes: Routes = [
  {
    path: '',
    component: VisorComponent,
    data: {
      title: 'Visor',
      urls: [
        { title: 'Visor', url: '/visor' },
      ],
    }
  },

];
