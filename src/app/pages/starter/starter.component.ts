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
  private formularioService:FormularioService,
) {
  this.cedula= localStorage.getItem('cedula')!;
  this.celular= localStorage.getItem('celular')!;
  const rol= localStorage.getItem('rol')!;
  if(rol!='DELEGADO'){
    localStorage.clear();
        this.router.navigate(['/authentication/login']);
  }
}
  ngOnInit(): void {
    this.activarEnvioImagen=false;
    this.buscarJuntas();
   }

   buscarJuntas(){
    this.spinner.show();
    this.formularioService.buscarJuntasCedulaCelular(this.cedula, this.celular).subscribe(
      (respuesta:any)=>{

        this.listaJuntas=respuesta.listado;
        this.recinto=this.listaJuntas[0].recinto;
        if(this.listaJuntas.length==1){
          this.junta=this.listaJuntas[0];
          this.seleccionarJunta();
        }
        this.spinner.hide();
      },
      (error)=>{
        this.spinner.hide();
        console.log("error: ", error);
      }
    );
   }

   seleccionarJunta(){

    this.actaFormGroup = this._formBuilder.group({
        sufragantes: [this.junta.sufragantes],
        blancos: [this.junta.blancos],
        nulos: [this.junta.nulos],
        si: [this.junta.si],
        no: [this.junta.no],
      });
    if(this.junta.imagen!=null){
      this.actaPhoto='data:image/png;base64,'+this.junta.imagen;
    }else{
      this.actaPhoto=null;
    }
    if(this.junta.sufragantes>0 || this.junta.blancos>0 || this.junta.nulos>0 ||
      this.junta.si>0 || this.junta.no>0
    ){
      this.activarEnvioImagen=true;
    }else{
      this.activarEnvioImagen=false;
    }
   }

   enviarDatosActa(){
    this.spinner.show();
    this.junta.sufragantes=Number( this.actaFormGroup.get('sufragantes')?.value ?? 0);
    this.junta.blancos=Number(this.actaFormGroup.get('blancos')?.value ?? 0);
    this.junta.nulos=Number(this.actaFormGroup.get('nulos')?.value ?? 0);
    this.junta.si=Number(this.actaFormGroup.get('si')?.value ?? 0);
    this.junta.no=Number(this.actaFormGroup.get('no')?.value ?? 0);

    let suma:number=this.junta.blancos+this.junta.nulos+this.junta.si+this.junta.no;
    if(suma > this.junta.sufragantes){
      Swal.fire({
      title: "La suma de votos es inconsistente enviar o volver a revisar",
      showDenyButton: true,
      showCancelButton: false,
      denyButtonText: `Revisar`,
      confirmButtonText: "Guardar",
      icon: "warning",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.junta.obsVotacion='INCOSISTENTE';
        this.guardar();
      } else if (result.isDenied) {
        //nothing
        this.spinner.hide();
      }
    });
    }else{
       this.junta.obsVotacion='VALIDA';
      this.guardar();
    }

  }

  guardar(){
    this.junta.estVotacion='SI';
    this.formularioService.guardarJunta(this.junta).subscribe(
      (respuesta:any)=>{
        this.spinner.hide();
        Swal.fire('Datos Guardados','','info');
        this.activarEnvioImagen=true;
      },
      (error)=>{
        this.spinner.hide();
        Swal.fire('Error, vuelva a intentar','','error');
        this.activarEnvioImagen=false;
      }
    );
  }

   enviarImagenActa(){
    this.spinner.show();
    const base64Limpio = this.actaPhoto!.split(',')[1];
    this.formularioService.guardarJuntaImagen(this.junta, base64Limpio).subscribe(
      (respuesta:any)=>{
        this.spinner.hide();
        Swal.fire('Imagen Registrada','','info');
      },
      (error)=>{
        this.spinner.hide();
        console.log("error",error);
        Swal.fire('Error, vuelva a intentar','','error');
      }
    );
   }

   openCameraDialog(): void {
  const dialogRef = this.dialog.open(CameraCaptureComponent, {
    panelClass: 'full-screen-dialog', // Aplicará una clase personalizada
    width: '100vw',
    height: '90vh',
    maxWidth: '100vw',
    maxHeight: '90vh'
  });

  dialogRef.afterClosed().subscribe(async (result: string | undefined) => {
    if (result) {

          this.spinner.show();
          this.actaPhoto = result;
          this.spinner.hide();
          if (!this.actaPhoto || !this.actaPhoto.includes("base64,")) {
            Swal.fire("No se pudo obtener la imagen del dispositivo.");
            return;
          }

    }
  });
  }

   onlyNumbers(event: KeyboardEvent) {
      const charCode = event.which ? event.which : event.keyCode;
      // Solo permite dígitos (0-9)
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    }
}
