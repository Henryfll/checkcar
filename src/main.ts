import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
/*fetch('/assets/config.json')
  .then((response) => response.json())
  .then((config) => {
    (window as any).config = config;  // Carga las variables de configuración
    bootstrapApplication(AppComponent).catch(err => console.error(err));
  })
  .catch((err) => {
    console.error('Error cargando el archivo config.json:', err);
  });*/
