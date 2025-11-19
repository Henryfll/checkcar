import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-visor-imagen',
  standalone: true,
  imports: [
     CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIcon,
        MatInputModule,
        NgxSpinnerModule
  ],
  templateUrl: './visor-imagen.component.html',
  styleUrl: './visor-imagen.component.scss'
})
export class VisorImagenComponent {

  imagen:string;
   actaPhoto: string | null = null;

  constructor(
      public dialogRef: MatDialogRef<VisorImagenComponent>, // Para controlar el diálogo
      @Inject(MAT_DIALOG_DATA) public data: any, // Para recibir la data (Junta)
      private spinner: NgxSpinnerService,
    ) {
      this.imagen = data.imagen;
      console.log("imagen",this.imagen)
      this.actaPhoto='data:image/png;base64,'+this.imagen;
    }

      cerrarDialogo(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }
}
