import { Component, inject, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'; // Importaciones clave
import { Junta } from 'src/app/pages/starter/interfaces/junta';
import { Delegado } from '../../interfaces/delegado';
import { DelegadoServiceService } from '../../services/delegado-service.service';

@Component({
  selector: 'app-delegados-popup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatInputModule,
    MatSelect,
    MatOption,
    NgxSpinnerModule
  ],
  templateUrl: './delegados-popup.component.html',
  styleUrl: './delegados-popup.component.scss'
})
export class DelegadosPopupComponent implements OnInit {

  juntaSeleccionada: Junta;
  delegadoPrincipal: Delegado | null = null;
  delegadoContingente: Delegado | null = null;

  TIPO_PRINCIPAL: number;
  TIPO_CONTINGENTE: number;

  constructor(
    public dialogRef: MatDialogRef<DelegadosPopupComponent>, // Para controlar el diálogo
    @Inject(MAT_DIALOG_DATA) public data: any, // Para recibir la data (Junta)
    private spinner: NgxSpinnerService,
    private _delegadoService: DelegadoServiceService,
  ) {
    this.juntaSeleccionada = data.junta;
    this.TIPO_PRINCIPAL = data.TIPO_PRINCIPAL;
    this.TIPO_CONTINGENTE = data.TIPO_CONTINGENTE;
  }

  ngOnInit(): void {
    this.cargarDelegados();
  }

  cargarDelegados() {
    this.spinner.show();
    this._delegadoService.listarDelegadosPorJunta(this.juntaSeleccionada.codigo).subscribe(
      (respuesta: any) => {

        let listaDelegados: Delegado[] = respuesta.listado;
        if (listaDelegados.length === 0) {
          this.inicializarDelegadosVacios();
        } else {
          let delegadoPrincipalEncontrado = listaDelegados.find(d => d.tipoDelegado === this.TIPO_PRINCIPAL);
          if (delegadoPrincipalEncontrado === undefined) {
            this.inicializarPrincipalVacio();
          } else {
            this.delegadoPrincipal = delegadoPrincipalEncontrado;
          }

          let delegadoContingenteEncontrado = listaDelegados.find(d => d.tipoDelegado === this.TIPO_CONTINGENTE);
          if (delegadoContingenteEncontrado === undefined) {
            this.inicializarContingenteVacio();
          } else {
            this.delegadoContingente = delegadoContingenteEncontrado;
          }
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  // Lógica de inicialización (movida desde el componente principal)
  private inicializarDelegadosVacios() {
    this.inicializarPrincipalVacio();
    this.inicializarContingenteVacio();
  }

  private inicializarPrincipalVacio() {
    this.delegadoPrincipal = {
      cedula: '', nombre: '', celular: '', operadora: '', referidoPor: '',
      banco: '', cuenta: '', tipoCuenta: '', duenoCuenta: '', email: '',
      tipoDelegado: this.TIPO_PRINCIPAL, junta: this.juntaSeleccionada.codigo,
      compensacion: '', recarga: '', recargado: ''
    };
  }

  private inicializarContingenteVacio() {
    this.delegadoContingente = {
      cedula: '', nombre: '', celular: '', operadora: '', referidoPor: '',
      banco: '', cuenta: '', tipoCuenta: '', duenoCuenta: '', email: '',
      tipoDelegado: this.TIPO_CONTINGENTE, junta: this.juntaSeleccionada.codigo,
      compensacion: '', recarga: '', recargado: ''
    };
  }


  guardarPrincipal() {
    this.spinner.show();
    this._delegadoService.guardarDelegado(this.delegadoPrincipal!).subscribe(
      (respuesta: any) => {

        this.delegadoPrincipal = respuesta.objeto;
        this.spinner.hide();
        Swal.fire('Delegado Principal Actualizado', '', 'info');
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Error, vuelva a intentar', '', 'error');
        console.log("error: ", error);
      }
    );
  }

  guardarContingente() {
    this.spinner.show();
    this._delegadoService.guardarDelegado(this.delegadoContingente!).subscribe(
      (respuesta: any) => {
        this.spinner.hide();
        this.delegadoContingente = respuesta.objeto;
        Swal.fire('Delegado Contingente Actualizado', '', 'info');
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Error, vuelva a intentar', '', 'error');
        console.log("error: ", error);
      });
  }

  cerrarDialogo(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Solo permite dígitos (0-9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
