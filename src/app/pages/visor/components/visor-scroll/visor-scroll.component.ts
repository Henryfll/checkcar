import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Delegado } from 'src/app/pages/incripcion/interfaces/delegado';
import { DelegadoServiceService } from 'src/app/pages/incripcion/services/delegado-service.service';
import { ImagenJunta } from 'src/app/pages/starter/interfaces/imagenjunta';

@Component({
  selector: 'app-visor-scroll',
  standalone: true,
  imports: [ CommonModule,
          FormsModule,
          MatCardModule,
          MatButtonModule,
          MatIcon,
          MatInputModule,
          NgxSpinnerModule],
  templateUrl: './visor-scroll.component.html',
  styleUrl: './visor-scroll.component.scss'
})
export class VisorScrollComponent {


     codigoJunta :number;
     imagenes: ImagenJunta[] = [];
     mensaje:string='Cargando...';

    constructor(
        public dialogRef: MatDialogRef<VisorScrollComponent>, // Para controlar el diálogo
        @Inject(MAT_DIALOG_DATA) public data: any, // Para recibir la data (Junta)
        private spinner: NgxSpinnerService,
        private _delegadoService:DelegadoServiceService,
      ) {
        this.codigoJunta = data.codigoJunta;
        //this.actaPhoto='data:image/png;base64,'+this.imagen;
      }

     ngOnInit(): void {
        this.cargarImagenes();
      }

      cargarImagenes() {
        this.spinner.show();
        this._delegadoService.listarImagenesAnexos(this.codigoJunta).subscribe(
          (respuesta: any) => {
            this.imagenes=respuesta.listado;

            this.imagenes.forEach(element => {
              element.imagen='data:image/png;base64,'+element.imagen;
            });
            if(this.imagenes.length>0){
              this.mensaje='';
            }else{
              this.mensaje='No existen anexos en esta Junta'
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.log(error);
          }
        );
      }

     cerrarDialogo(): void {
      this.dialogRef.close(); // Cierra el diálogo
    }

    descargarImagen(element: ImagenJunta): void {
        // 1. Crear el Data URL completo si no lo tiene.
        // Asume que tu 'imagenBase64' ya incluye el prefijo 'data:image/png;base64,' o similar.
        // Si tu cadena solo es el Base64 puro, debes prefijarla:
        // const dataUrl = 'data:image/png;base64,' + this.imagenBase64;

        // Si ya tienes la cadena completa (recomendado):
        const dataUrl = element.imagen;

        // 2. Crear un elemento 'a' (enlace) en el DOM
        const link = document.createElement('a');

        // 3. Establecer el href al Data URL
        link.href = dataUrl;

        // 4. Establecer el atributo 'download' para forzar la descarga y darle un nombre
        link.download = element.codigo+'_'+element.codigoJunta;

        // 5. Simular un clic en el enlace
        document.body.appendChild(link);
        link.click();

        // 6. Limpieza: remover el elemento del DOM
        document.body.removeChild(link);
      }
}
