import { Routes } from '@angular/router';
import { TransmicionComponent } from './transmicion.component';

export const TransmicionRoutes: Routes = [
  {
    path: '',
    component: TransmicionComponent,
    data: {
      title: 'Transmicion',
      urls: [
        { title: 'Transmicion', url: '/transmicion' },
      ],
    }
  },

];
