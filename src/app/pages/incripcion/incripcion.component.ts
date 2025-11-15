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
  if(rol!='MONITOREO'){
    localStorage.clear();
        this.router.navigate(['/authentication/login']);
  }
  }

  ngOnInit(): void {

  }


}
