import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DelegadoServiceService } from './services/delegado-service.service';
import { Junta } from '../starter/interfaces/junta';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Delegado } from './interfaces/delegado';
import { FormularioService } from '../starter/services/formulario.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DelegadosPopupComponent } from './components/delegados-popup/delegados-popup.component';

@Component({
  selector: 'app-incripcion',
  standalone: true,
  imports: [
    MatButtonModule,
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
        MatPaginator
  ],
  templateUrl: './incripcion.component.html',
  styleUrl: './incripcion.component.scss'
})
export class IncripcionComponent {

  private _formBuilder = inject(FormBuilder);

  listaJuntas:Junta[]=[];

  TIPO_PRINCIPAL:number=0;
  TIPO_CONTINGENTE:number=1;

  columasJuntas=['numero','provincia',
'canton',
'parroquia',
'recinto',
'junta','estDelegado', 'obsDelegado','voluntario', 'estVotacion','obsVotacion','instaldoJrv','estaManana','estarTarde','opciones'];
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
  this._delegadoService.listarJuntas().subscribe(
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

asignarDelegados(element: Junta) {

  this.seleccionarFila(element);

  const dialogRef = this.dialog.open(DelegadosPopupComponent, {
    width: '1500px',
    data: {
      junta: element,
      TIPO_PRINCIPAL: this.TIPO_PRINCIPAL,
      TIPO_CONTINGENTE: this.TIPO_CONTINGENTE
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo de delegados se ha cerrado. La fila debe seguir marcada.');
    // Como NO estás recargando la tabla, la variable
    // `this.selectedJuntaCodigo` no se ha tocado, y el resaltado debe persistir.
  });
}

  guardarPrincipal(){
    this.spinner.show();
      this._delegadoService.guardarDelegado(this.delegadoPrincipal!).subscribe(
      (respuesta:any)=>{

        this.delegadoPrincipal=respuesta.objeto;
        this.spinner.hide();
        Swal.fire('Delegado Actualizado','','info');
      },
      (error)=>{
        this.spinner.hide();
         Swal.fire('Error, vuelva a intentar','','error');
        console.log("error: ", error);
      }
    );
  }
  guardarContingente(){
    this.spinner.show();
this._delegadoService.guardarDelegado(this.delegadoContingente!).subscribe(
      (respuesta:any)=>{
        this.spinner.hide();
        this.delegadoContingente=respuesta.objeto;
         Swal.fire('Delegado Actualizado','','info');
      },
      (error)=>{
        this.spinner.hide();
         Swal.fire('Error, vuelva a intentar','','error');
        console.log("error: ", error);
      });
  }

  cerrar(){
    this.juntaSeleccionada=null;
    this.delegadoPrincipal=null;
    this.delegadoContingente=null;
     setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
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

     onlyNumbers(event: KeyboardEvent) {
      const charCode = event.which ? event.which : event.keyCode;
      // Solo permite dígitos (0-9)
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
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
