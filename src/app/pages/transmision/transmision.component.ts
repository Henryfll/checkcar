import { Component, inject, ViewChild } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DelegadoServiceService } from '../incripcion/services/delegado-service.service';
import { FormularioService } from '../starter/services/formulario.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Delegado } from '../incripcion/interfaces/delegado';
import { Junta } from '../starter/interfaces/junta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transmision',
  standalone: true,
  imports: [ MatButtonModule,
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
  templateUrl: './transmision.component.html',
  styleUrl: './transmision.component.scss'
})
export class TransmisionComponent {


    private _formBuilder = inject(FormBuilder);

    listaJuntas:Junta[]=[];

    TIPO_PRINCIPAL:number=0;
    TIPO_CONTINGENTE:number=1;

    columasJuntas=['numero','provincia',
  'canton',
  'parroquia',
  'recinto',
  'junta','celular','nombre','estVotacion','obsVotacion','opciones'];
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
        if(rol!='OPERADOR'){
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
  this._delegadoService.listarJuntasCelulares().subscribe(
    (respuesta: any) => {
      console.log(respuesta);
      this.listaJuntas = respuesta.listado;
      /*this.listaJuntas.forEach(element => {
        this._delegadoService.listarDelegadosPorJunta(element.codigo).subscribe(
      (respuesta: any) => {

        let listaDelegados: Delegado[] = respuesta.listado;
          let delegadoPrincipalEncontrado = listaDelegados.find(d => d.tipoDelegado === this.TIPO_PRINCIPAL);
          if (delegadoPrincipalEncontrado === undefined) {
            element.nombre="";
            element.celular="";
          } else {
            element.nombre=delegadoPrincipalEncontrado.nombre;
            element.celular=delegadoPrincipalEncontrado.celular;
          }

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
      });*/
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
}
