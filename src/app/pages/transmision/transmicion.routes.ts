import { Routes } from '@angular/router';
import { TransmicionComponent } from './transmicion.component';

export const TransmicionRoutes: Routes = [
  {
    path: '',
    component: TransmicionComponent,
    data: {
      title: 'Transmision',
      urls: [
        { title: 'Transmicion', url: '/transmision' },
      ],
    }
  },

];
