import { Routes } from '@angular/router';
import { TransmisionComponent } from './transmision.component';

export const TransmisionRoutes: Routes = [
  {
    path: '',
    component: TransmisionComponent,
    data: {
      title: 'Transmision',
      urls: [
        { title: 'Transmision', url: '/transmision' },
      ],
    }
  },

];
