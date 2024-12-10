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
import { Accesorio } from './interfaces/accesorio';
import { MatTableModule } from '@angular/material/table';
import { CameraCaptureFigureComponent } from 'src/app/components/camera-capture-figure/camera-capture-figure.component';

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
    MatTableModule
  ],
  templateUrl: './starter.component.html',
  styleUrl:'./started.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {

  private _formBuilder = inject(FormBuilder);

  cedula:string="";
  aseguradora="";
  caso="";

  //Por favor envía tu ubicación.
  primerFormGroup = this._formBuilder.group({
    latitude: [''],
    longitude: [''],
  });
  //¿La matrícula está a nombre del tomador del seguro?
  segundoFormGroup = this._formBuilder.group({
    matriculaNombreDelTomador: ['', Validators.required],
  });

  //Muchas gracias, ahora por favor toma una fotografía legible frontal de la matricula, allí podrás ver los datos del vehículo.
  terceroFormGroup = this._formBuilder.group({
    matriculaFrontal: ['', Validators.required],
  });
//Muchas gracias, ahora por favor toma una fotografía legible posterior de la matrícula, allí podrás ver los datos del dueño del vehículo.
  cuartoFormGroup = this._formBuilder.group({
    matriculaPosterior: ['', Validators.required],
  });
// Envíe la foto del número de chasis del vehículo
  quintoFormGroup = this._formBuilder.group({
    chasis: ['', Validators.required],
  });
//Muchas gracias, por favor toma una fotografía de la parte frontal del vehículo, asegúrate que en la imagen se vean los retrovisores.
  sextoFormGroup = this._formBuilder.group({
    frontalVehiculo: ['', Validators.required],
  });
//Muchas gracias, ahora por favor toma una fotografía de la parte posterior del vehículo, asegúrate que en la imagen se vean los faros posteriores.
  septimoFormGroup = this._formBuilder.group({
    posteriorVehiculo: ['', Validators.required],
  });
//Muchas gracias, ahora por favor toma una fotografía de la parte lateral izquierda del vehículo, asegúrate que en la fotografía se vean los faros delanteros y traseros.
  octavoFormGroup = this._formBuilder.group({
    izquierdaVehiculo: ['', Validators.required],
  });
//Ahora, por favor toma una fotografía del tablero del vehículo, allí podrás ver desde el volante hasta la guantera en una sola imagen.
novenoFormGroup = this._formBuilder.group({
  tableroVehiculo: ['', Validators.required],
});

//Muchas gracias, ahora por favor toma una fotografía en primer plano del panel de instrumentos del vehículo
decimoFormGroup = this._formBuilder.group({
  panelVehiculo: ['', Validators.required],
});
//Muchas gracias, ahora por favor toma una fotografía en primer plano del kilometraje del total recorrido.
onceFormGroup = this._formBuilder.group({
  tacometroVehiculo: ['', Validators.required],
});

//Muchas gracias, ahora vamos con los documentos, por favor toma una fotografía legible de la parte frontal de tu cédula.

doceFormGroup = this._formBuilder.group({
  cedula: ['', Validators.required],
});
//Muchas gracias, ahora por favor toma una fotografía legible de la parte frontal de tu licencia de conducir.
treceFormGroup = this._formBuilder.group({
  licencia: ['', Validators.required],
});

//Desea declarar un accesorios extra del vehículo?
catorceFormGroup = this._formBuilder.group({
  tieneAccesorio: ['', Validators.required],
});
//nuevo accesorio
nuevoAccesorioFormGroup = this._formBuilder.group({
  fotoAccesorio: ['', Validators.required], //Por favor, toma una foto del nuevo accesorio que deseas declarar.
  valorAccesorio: ['', Validators.required],//Ingrese el valor del accesorio del vehículo
  descripcionAccesorio: ['', Validators.required]//Por favor, agregue la descripción del accesorio.
});


//¿Tu vehículo tiene algún golpe, rayón, raspadura, abolladura, vidrios rotos o trizados, desgaste en pintura o cualquier tipo de daño?
diezochoFormGroup = this._formBuilder.group({
  tieneDaniosVehiculo: ['', Validators.required],
});

//Muchas gracias, ahora ingrese una foto del daño del vehículo.
diezNueveFormGroup = this._formBuilder.group({
  danioVehiculo: ['', Validators.required],
});
//Por favor, agregue la descripción del problema.
veinteFormGroup = this._formBuilder.group({
  problemaVehiculo: ['', Validators.required],
});
//Por favor envía tu ubicación
veinteUnoFormGroup = this._formBuilder.group({
  problemaVehiculo: ['', Validators.required],
});
//Gracias por usar nuestro servicio. Hasta la próxima.
isLinear = false;

matriculaFrontalPhoto: string | null = null;
matriculaPosteriorPhoto: string | null = null;
chasisPhoto: string | null = null;
frontalVehiculoPhoto: string | null = null;
posteriorVehiculoPhoto:string | null = null;
izquierdaVehiculoPhoto:string | null = null;
tableroVehiculoPhoto:string | null = null;
panelVehiculoPhoto:string | null = null;
tacometroVehiculoPhoto:string | null = null;
cedulaPhoto:string | null = null;
licenciaPhoto:string | null = null;
danioVehiculoPhoto:string | null = null;
nuevoAccesorioPhoto:string | null = null;

listaAccesorios:Accesorio[]=[];
columnsAccesorios: string[] = ['foto', 'valor', 'descripcion'];

constructor(private dialog: MatDialog) {
  this.cedula= localStorage.getItem('cedula')!;
  console.log("cedula: ",this.cedula);
  this.caso= localStorage.getItem('nro_caso')!;
  this.aseguradora= localStorage.getItem('aseguradora')!;
  //this.requestLocationAccess();
}

openCameraDialog(preguntaNumber:number): void {
  const dialogRef = this.dialog.open(CameraCaptureComponent, {
    width: '80%',
    height: '50%'
  });

  dialogRef.afterClosed().subscribe((result: string | undefined) => {
    if (result) {
      switch (preguntaNumber){
        case 3:
          this.matriculaFrontalPhoto = result;
          this.terceroFormGroup.get('matriculaFrontal')?.setValue(result);
          break;
        case 4:
          this.matriculaPosteriorPhoto = result;
          this.cuartoFormGroup.get('matriculaPosterior')?.setValue(result);
          break;
        case 5:
          this.chasisPhoto = result;
          this.quintoFormGroup.get('chasis')?.setValue(result);
          break;
        case 6:
          this.frontalVehiculoPhoto = result;
          this.sextoFormGroup.get('frontalVehiculo')?.setValue(result);
          break;
        case 7:
          this.posteriorVehiculoPhoto = result;
          this.septimoFormGroup.get('posteriorVehiculo')?.setValue(result);
          break;
        case 8:
          this.izquierdaVehiculoPhoto = result;
          this.octavoFormGroup.get('izquierdaVehiculo')?.setValue(result);
          break;
        case 9:
          this.tableroVehiculoPhoto = result;
          this.novenoFormGroup.get('tableroVehiculo')?.setValue(result);
          break;
        case 10:
          this.panelVehiculoPhoto = result;
          this.decimoFormGroup.get('panelVehiculo')?.setValue(result);
          break;
        case 11:
          this.tacometroVehiculoPhoto = result;
          this.onceFormGroup.get('tacometroVehiculo')?.setValue(result);
          break;
        case 12:
          this.cedulaPhoto = result;
          this.doceFormGroup.get('cedula')?.setValue(result);
          break;
        case 13:
          this.licenciaPhoto = result;
          this.treceFormGroup.get('licencia')?.setValue(result);
          break;
        case 14:
          this.nuevoAccesorioPhoto = result;
          this.nuevoAccesorioFormGroup.get('fotoAccesorio')?.setValue(result);
          break;
        case 19:
          this.danioVehiculoPhoto = result;
          this.diezNueveFormGroup.get('danioVehiculo')?.setValue(result);
          break;
      }
      //console.log('Foto capturada:', this.matriculaFrontalPhoto);
    }
  });
}
openCameraDialogFigure(preguntaNumber:number): void {
  const dialogRef = this.dialog.open(CameraCaptureFigureComponent, {
    width: '80%',
    height: '50%'
  });

  dialogRef.afterClosed().subscribe((result: string | undefined) => {
    if (result) {
      switch (preguntaNumber){
        case 3:
          this.matriculaFrontalPhoto = result;
          this.terceroFormGroup.get('matriculaFrontal')?.setValue(result);
          break;
        case 4:
          this.matriculaPosteriorPhoto = result;
          this.cuartoFormGroup.get('matriculaPosterior')?.setValue(result);
          break;
        case 5:
          this.chasisPhoto = result;
          this.quintoFormGroup.get('chasis')?.setValue(result);
          break;
        case 6:
          this.frontalVehiculoPhoto = result;
          this.sextoFormGroup.get('frontalVehiculo')?.setValue(result);
          break;
        case 7:
          this.posteriorVehiculoPhoto = result;
          this.septimoFormGroup.get('posteriorVehiculo')?.setValue(result);
          break;
        case 8:
          this.izquierdaVehiculoPhoto = result;
          this.octavoFormGroup.get('izquierdaVehiculo')?.setValue(result);
          break;
        case 9:
          this.tableroVehiculoPhoto = result;
          this.novenoFormGroup.get('tableroVehiculo')?.setValue(result);
          break;
        case 10:
          this.panelVehiculoPhoto = result;
          this.decimoFormGroup.get('panelVehiculo')?.setValue(result);
          break;
        case 11:
          this.tacometroVehiculoPhoto = result;
          this.onceFormGroup.get('tacometroVehiculo')?.setValue(result);
          break;
        case 12:
          this.cedulaPhoto = result;
          this.doceFormGroup.get('cedula')?.setValue(result);
          break;
        case 13:
          this.licenciaPhoto = result;
          this.treceFormGroup.get('licencia')?.setValue(result);
          break;
        case 14:
          this.nuevoAccesorioPhoto = result;
          this.nuevoAccesorioFormGroup.get('fotoAccesorio')?.setValue(result);
          break;
        case 19:
          this.danioVehiculoPhoto = result;
          this.diezNueveFormGroup.get('danioVehiculo')?.setValue(result);
          break;
      }
      //console.log('Foto capturada:', this.matriculaFrontalPhoto);
    }
  });
}

requestLocationAccess(): void {
  const userConfirmed = confirm('Necesitamos tu ubicación para brindarte un mejor servicio.');
  if (userConfirmed) {
    this.checkPermission();
  }
}

checkPermission(): void {
  navigator.permissions.query({ name: 'geolocation' }).then((result) => {
    if (result.state === 'granted') {
      console.log('Permiso concedido previamente');
      this.getLocation();
    } else if (result.state === 'prompt') {
      console.log('Se requiere permiso. Mostrando cuadro de diálogo del navegador.');
      this.getLocation();
    } else if (result.state === 'denied') {
      console.error('Permiso denegado. Por favor, habilítalo en la configuración del navegador.');
    }
  });
}

getLocation(): void {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //console.log(`Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`);
      this.primerFormGroup.patchValue({
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString()
      });
    },
    (error) => {
      console.error('Error obteniendo ubicación:', error);
    }
  );
}

agregarAccesorio(){
  let nuevoAccesorio:Accesorio={
    imagen:this.nuevoAccesorioFormGroup.get('fotoAccesorio')?.value ?? '',
    nombre:this.nuevoAccesorioFormGroup.get('descripcionAccesorio')?.value ?? '',
    precio: Number(this.nuevoAccesorioFormGroup.get('valorAccesorio')?.value)
  };

  this.listaAccesorios.push(nuevoAccesorio);

  this.nuevoAccesorioFormGroup = this._formBuilder.group({
    fotoAccesorio: ['', Validators.required], //Por favor, toma una foto del nuevo accesorio que deseas declarar.
    valorAccesorio: ['', Validators.required],//Ingrese el valor del accesorio del vehículo
    descripcionAccesorio: ['', Validators.required]//Por favor, agregue la descripción del accesorio.
  });

  this.nuevoAccesorioPhoto=null;
}

get ReactiveFrmCatorceFormGroup() {
  return this.catorceFormGroup.controls;
 }
 get ReactiveFrmNuevoAccesorio() {
  return this.nuevoAccesorioFormGroup.controls;
 }
}
