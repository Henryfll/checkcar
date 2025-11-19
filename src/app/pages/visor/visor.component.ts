import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Delegado } from '../incripcion/interfaces/delegado';
import { DelegadoServiceService } from '../incripcion/services/delegado-service.service';
import { Junta } from '../starter/interfaces/junta';
import { FormularioService } from '../starter/services/formulario.service';
import { VisorImagenComponent } from './components/visor-imagen/visor-imagen.component';
import { VisorScrollComponent } from './components/visor-scroll/visor-scroll.component';

@Component({
  selector: 'app-visor',
  standalone: true,
  imports: [MatButtonModule,
            MatStepperModule,
            FormsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatRadioModule,
            MatCardModule,
            CommonModule,
            MatIcon,
            MatTableModule,
            NgxSpinnerModule,
            MatSelect,
            MatOption,
            MatPaginator],
  templateUrl: './visor.component.html',
  styleUrl: './visor.component.scss'
})
export class VisorComponent {

    private _formBuilder = inject(FormBuilder);

    listaJuntas:Junta[]=[];

    TIPO_PRINCIPAL:number=0;
    TIPO_CONTINGENTE:number=1;

    columasJuntas=['numero','provincia',
  'canton',
  'parroquia',
  'recinto',
  'junta','sufragantes','blancos','nulos','si','no','estVotacion','imagen','anexos'];
  busqueda:string|null;
  expandedElement: any | null;
  dataSource = new MatTableDataSource<any>(this.listaJuntas);
  filters: any = {};
  juntaSeleccionada:Junta|null;

  selectedRow: Junta | null = null;
  selectedJuntaCodigo: number | null = null;
  delegadoPrincipal:Delegado|null;
  delegadoContingente:Delegado|null;
  usuarioLogueado:string='';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  constructor(
      private spinner: NgxSpinnerService,
      private _delegadoService:DelegadoServiceService,
      private formularioService:FormularioService,
      private router: Router,
      private dialog: MatDialog,
    ) {
        const rol= localStorage.getItem('rol')!;
        this.usuarioLogueado= localStorage.getItem('usuario')!;
        if(rol!='ADMINISTRADOR'){
          localStorage.clear();
              this.router.navigate(['/authentication/login']);
        }
    }

    ngOnInit(): void {
    this.buscarJuntas();
    this.juntaSeleccionada=null;
    this.dataSource.filterPredicate = (data: any, filterJson: string) => {
        const filters = JSON.parse(filterJson);

        return Object.keys(filters).every(column => {
          if (!filters[column]) return true; // filtro vacío = no filtrar
          return data[column]?.toString().toLowerCase().includes(filters[column]);
        });
      };
  }

  buscarJuntas() {
  this.spinner.show();
  this._delegadoService.listarJuntasImagenes().subscribe(
    (respuesta: any) => {
      this.listaJuntas = respuesta.listado;

      this.dataSource = new MatTableDataSource(this.listaJuntas);

      // REINSTALAR paginator, sort y FILTERPREDICATE
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: any, filterJson: string) => {
        const filters = JSON.parse(filterJson);

        return Object.keys(filters).every(column => {
          if (!filters[column]) return true;

          const dataValue = (data[column] ?? '').toString().toLowerCase();
          return dataValue.includes(filters[column]);
        });
      };

      this.spinner.hide();
    },
    (error) => {
      this.spinner.hide();
      console.log("error: ", error);
    }
  );
}


  applyFilter(column: string, event: any) {
  const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.filters[column] = value;
  this.dataSource.filter = JSON.stringify(this.filters);
}

applySelectFilter(column: string, value: string) {
  this.filters[column] = value.trim().toLowerCase();
  this.dataSource.filter = JSON.stringify(this.filters);
}
  nuevaBusqueda(){
    this.buscarJuntas();
  }

  guardarJunta(element:Junta){
      this.spinner.show();
      element.usrActualiza=this.usuarioLogueado;
        this.formularioService.guardarJunta(element).subscribe(
          (respuesta:any)=>{
            this.spinner.hide();
            Swal.fire('Datos Guardados','','info');
          },
          (error)=>{
            this.spinner.hide();
            console.log("error",error);
            Swal.fire('Error, vuelva a intentar','','error');
          }
        );
    }

    seleccionarFila(row: Junta) {
      // Si la fila clicada es la misma que ya está seleccionada, la deselecciona (null)
      // Si no es la misma, la selecciona
      this.selectedRow = this.selectedRow === row ? null : row;
    }

    // Función para verificar si la fila es la seleccionada (útil para el CSS)
    isRowSelected(row: Junta): boolean {
      return this.selectedRow === row;
    }

    verImagen(element: Junta) {


      const dialogRef = this.dialog.open(VisorImagenComponent, {
        width: '50%',
        data: {
          imagen:element.imagen
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }

    descargarImagen(element: Junta): void {
    // 1. Crear el Data URL completo si no lo tiene.
    // Asume que tu 'imagenBase64' ya incluye el prefijo 'data:image/png;base64,' o similar.
    // Si tu cadena solo es el Base64 puro, debes prefijarla:
    // const dataUrl = 'data:image/png;base64,' + this.imagenBase64;

    // Si ya tienes la cadena completa (recomendado):
    const dataUrl = 'data:image/png;base64,'+element.imagen;

    // 2. Crear un elemento 'a' (enlace) en el DOM
    const link = document.createElement('a');

    // 3. Establecer el href al Data URL
    link.href = dataUrl;

    // 4. Establecer el atributo 'download' para forzar la descarga y darle un nombre
    link.download = element.codJunta;

    // 5. Simular un clic en el enlace
    document.body.appendChild(link);
    link.click();

    // 6. Limpieza: remover el elemento del DOM
    document.body.removeChild(link);
  }

  verAnexos(element: Junta) {


      const dialogRef = this.dialog.open(VisorScrollComponent, {
        width: '50%',
        data: {
          codigoJunta:element.codigo
        }
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
}
