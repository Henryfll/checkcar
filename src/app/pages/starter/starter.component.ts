import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { CameraCaptureComponent } from 'src/app/components/camera-capture/camera-capture.component';
import { MatTableModule } from '@angular/material/table';
import { FormularioService } from './services/formulario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import { Junta } from './interfaces/junta';

@Component({
  selector: 'app-starter',
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
    MatOption
  ],
  templateUrl: './starter.component.html',
  styleUrl:'./started.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {

  private _formBuilder = inject(FormBuilder);

  cedula:string="";
  celular:string="";

  activarEnvioImagen:boolean;
  junta:Junta;
  recinto:string="";
  listaJuntas:Junta[]=[];
  actaPhoto: string | null = null;

 actaFormGroup = this._formBuilder.group({
    sufragantes: [0],
    blancos: [0],
    nulos: [0],
    si: [0],
    no: [0],
  });

constructor(
  private dialog: MatDialog,
  private router: Router,
  private spinner: NgxSpinnerService,
) {
  this.cedula= localStorage.getItem('cedula')!;
  this.celular= localStorage.getItem('celular')!;
  const rol= localStorage.getItem('rol')!;
  if(rol!='MONITOREO'){
    localStorage.clear();
        this.router.navigate(['/authentication/login']);
  }
}
  ngOnInit(): void {
    this.activarEnvioImagen=false;
   }

   }
