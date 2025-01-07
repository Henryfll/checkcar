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
import { FormularioService } from './services/formulario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChatgptService } from './services/chatgpt.service';

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
//parte negativa
   // ¿Cuentas con el contrato de compraventa debidamente notarizado? Asegúrate de tener a la mano este documento, lo necesitarás más adelante.
   segundoUnoFormGroup = this._formBuilder.group({
    tieneContrato: ['', Validators.required],
  });
  //si
      //Por favor toma una foto legible del contrato de compraventa donde aparecen los datos del vehículo y del comprador y vendedor.
      segundoUnoSiUnoFormGroup = this._formBuilder.group({
        fotoContrato: ['', Validators.required],
      });
      //Muchas gracias, ahora por favor toma una foto legible del contrato de compraventa donde aparece el reconocimiento de firmas del contrato.
      segundoUnoSiDosFormGroup = this._formBuilder.group({
        fotoFirmas: ['', Validators.required],
      });
  //no fin
//parte postiva y continuacion
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
  ubicacionVehiculo: ['', Validators.required],
});
//Gracias por usar nuestro servicio. Hasta la próxima.
isLinear = true;

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
contratoPhoto:string | null = null;
firmaPhoto:string | null = null;


listaAccesorios:Accesorio[]=[];
columnsAccesorios: string[] = ['foto', 'valor', 'descripcion'];
placa:string;
vin:string;

latitud:string;
longitud:string;

constructor(
  private dialog: MatDialog,
  private _formService:FormularioService,
  private _chatGptService:ChatgptService,
  private router: Router
) {
  this.cedula= localStorage.getItem('cedula')!;
  this.caso= localStorage.getItem('nro_caso')!;
  this.aseguradora= localStorage.getItem('aseguradora')!;
  if(this.cedula=="" || this.cedula==null){
    localStorage.clear();
        this.router.navigate(['/authentication/login']);
  }
  this.requestLocationAccess();
}

openCameraDialog(preguntaNumber:number): void {
  const dialogRef = this.dialog.open(CameraCaptureComponent, {
    width: '90%',
    height: '70%'
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
        case 21:
          this.contratoPhoto = result;
          this.segundoUnoSiUnoFormGroup.get('fotoContrato')?.setValue(result);
          break;
        case 22:
          this.firmaPhoto = result;
          this.segundoUnoSiDosFormGroup.get('fotoFirmas')?.setValue(result);
          break;
      }
      //console.log('Foto capturada:', this.matriculaFrontalPhoto);
    }
  });
}
openCameraDialogFigure(preguntaNumber:number): void {
  const dialogRef = this.dialog.open(CameraCaptureFigureComponent, {
    width: '90%',
    height: '70%'
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
        case 21:
          this.contratoPhoto = result;
          this.segundoUnoSiUnoFormGroup.get('fotoContrato')?.setValue(result);
          break;
        case 22:
          this.firmaPhoto = result;
          this.segundoUnoSiDosFormGroup.get('fotoFirmas')?.setValue(result);
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
get ReactiveFrmSegundoFormGroup() {
  return this.segundoFormGroup.controls;
 }
 get ReactiveFrmSegundoUnoFormGroup() {
  return this.segundoUnoFormGroup.controls;
 }
get ReactiveFrmCatorceFormGroup() {
  return this.catorceFormGroup.controls;
 }
 get ReactiveFrmDiezOchoFormGroup() {
  return this.diezochoFormGroup.controls;
 }
 get ReactiveFrmNuevoAccesorio() {
  return this.nuevoAccesorioFormGroup.controls;
 }

 async procesarFormulario(){
  let matriculaNombreDelTomador=this.segundoFormGroup.get("matriculaNombreDelTomador")?.value;
  let tieneContrato=this.segundoUnoFormGroup.get("tieneContrato")?.value;
  let tieneAc=this.catorceFormGroup.get("tieneAccesorio")?.value;
  let tieneDaniosVehiculo=this.diezochoFormGroup.get("tieneDaniosVehiculo")?.value;

  this.latitud=this.primerFormGroup.get("latitude")?.value!;
  this.longitud=this.primerFormGroup.get("longitude")?.value!;

  let Q1=await this.guardarPrimeraPregunta();
  let Q2=await this.guardarPrimeraPregunta();
  if(matriculaNombreDelTomador==="No"){
    let Q21=await this.guardarSegundaUnaPregunta();
    if (tieneContrato==="Si") {
      let Q211=await this.guardarSegundaUnaSiUnaPregunta();
      let Q212=await this.guardarSegundaUnaSiDosPregunta();
    }
  }
  let Q3=await this.guardarTerceraPregunta();
  let Q4=await this.guardarCuartaPregunta();
  let Q5=await this.guardarQuintaPregunta();
  let Q6=await this.guardarSextaPregunta();
  if (Q6=="Error Placa") {
    localStorage.clear();
    this.router.navigate(['/authentication/login']);
    Swal.fire('Placas no coinciden','','error');
  }else{
    let Q7=await this.guardarSeptimaPregunta();
    if (Q7=="Error Placa") {
      localStorage.clear();
      this.router.navigate(['/authentication/login']);
      Swal.fire('Placas no coinciden','','error');
    }else{
      let Q8=await this.guardarOctavaPregunta();
      let Q9=await this.guardarNovenaPregunta();
      let Q10=await this.guardarDecimaPregunta();
      let Q11=await this.guardarOncePregunta();
      let Q12=await this.guardarDocePregunta();
      let Q13=await this.guardarTrecePregunta();
      let Q14=await this.guardarCatorcePregunta();
      if (tieneAc=="Si") {
        let Q15= await this.guardarAccesoriosPregunta();
      }
      let Q18=this.guardarDiezochoPregunta();
      if (tieneDaniosVehiculo=="Si") {
        let Q19= await this.guardarChoquePregunta();
      }
      let fin = await this.guardarFormulario();
      localStorage.clear();
        this.router.navigate(['/authentication/login']);
        Swal.fire('Formulario Guardado','','info');
    }
  }

 }
 /*procesarPreguntas(): void {

  this.guardarPrimeraPregunta()
    .pipe(
      concatMap(() => this.guardarSegundaPregunta()),
      concatMap(() => this.guardarSegundaUnaPregunta()),
      concatMap(() => this.guardarSegundaUnaSiUnaPregunta()),
      concatMap(() => this.guardarSegundaUnaSiDosPregunta()),
      concatMap(() => this.guardarTerceraPregunta()),
      concatMap(() => this.guardarCuartaPregunta()),
      concatMap(() => this.guardarQuintaPregunta()),
      concatMap(() => this.guardarSextaPregunta()),
      concatMap(() => this.guardarSeptimaPregunta()),
      concatMap(() => this.guardarOctavaPregunta()),
      concatMap(() => this.guardarNovenaPregunta()),
      concatMap(() => this.guardarDecimaPregunta()),
      concatMap(() => this.guardarOncePregunta()),
      concatMap(() => this.guardarDocePregunta()),
      concatMap(() => this.guardarTrecePregunta()),
      concatMap(() => this.guardarCatorcePregunta()),
      concatMap(() => this.guardarAccesoriosPregunta()),
      concatMap(() => this.guardarDiezochoPregunta()),
      concatMap(() => this.guardarChoquePregunta()),
      concatMap(() => this.guardarFormulario())
    )
    .subscribe({
      next: (response:any) => console.log('Respuesta procesada:', response),
      error: (error:any) => console.error('Error en la cadena:', error),
      complete: () => {
        console.log('Todas las preguntas han sido procesadas.');
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
        Swal.fire('Formulario Guardado','','info');
      },
    });
 }*/

 async guardarPrimeraPregunta() {

  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 1",
    "observacion":`Latitud: ${this.latitud}, Longitud: ${this.longitud}`,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarObservacion(pregunta);
    return { mensaje: 'Q1 OK', respuesta:respuesta };
  } catch (error) {
    console.error('Error en Q1:', error);
    return { mensaje: 'Error Q1'};
  }
 }

 async guardarSegundaPregunta() {
  let matriculaNombreDelTomador=this.segundoFormGroup.get("matriculaNombreDelTomador")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 2",
    "observacion":`${matriculaNombreDelTomador}`,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarObservacion(pregunta);
    return { mensaje: 'Q2 OK', respuesta:respuesta };
  } catch (error) {
    console.error('Error en Q2:', error);
    return { mensaje: 'Error Q2'};
  }
 }
 async guardarSegundaUnaPregunta() {
  let tieneContrato=this.segundoUnoFormGroup.get("tieneContrato")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 2.1",
    "observacion":`${tieneContrato}`,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarObservacion(pregunta);
    return { mensaje: 'Q2.1 OK', respuesta:respuesta };
  } catch (error) {
    console.error('Error en Q2.1:', error);
    return { mensaje: 'Error Q2.1'};
  }
 }
 async guardarSegundaUnaSiUnaPregunta() {
  let imagen=this.segundoUnoSiUnoFormGroup.get("fotoContrato")?.value?? '';
  let observacion= await this._chatGptService.esContratoDeCompraventa(imagen);
  if(observacion==false){
    this.mensajesError("Error foto de contrato...Continua el procesamiento");
  }
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 2.1.1",
    "imagen":imagen,
    "observacion":observacion,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q2.1.1 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q2.1.1:', error);
    return { mensaje: 'Error Q2.1.1'};
  }
 }
 async guardarSegundaUnaSiDosPregunta() {
  let imagen=this.segundoUnoSiDosFormGroup.get("fotoFirmas")?.value ?? '';
  let observacion= await this._chatGptService.esReconocimientoDeFirmas(imagen);
  if(observacion == false){
    this.mensajesError("Error firmas de contrato...Continua el procesamiento");
  }
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 2.1.2",
    "imagen":imagen,
    "observacion":observacion,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q2.1.2 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q2.1.2:', error);
    return { mensaje: 'Error Q2.1.2'};
  }
 }
 async guardarTerceraPregunta() {
  let imagen=this.terceroFormGroup.get("matriculaFrontal")?.value  ?? '';
  let observacion= await this._chatGptService.placaYVin(imagen);
  this.placa=observacion.placa;
  this.vin=observacion.vin;
  if(observacion.placa == "ABC123"){
    this.mensajesError("Error en la imagen matricula frontal...Continua el procesamiento");
  }
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 3",
    "imagen":imagen,
    "observacion":observacion,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q3 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q3:', error);
    return { mensaje: 'Error Q3'};
  }
 }
 async guardarCuartaPregunta() {
  let imagen=this.cuartoFormGroup.get("matriculaPosterior")?.value ?? '';
  let observacion= await this._chatGptService.caraTraseraDeCarnet(imagen);
  if(observacion == false){
    this.mensajesError("Error imagen matricula posterior...Continua el procesamiento");
  }
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 4",
    "imagen":imagen,
    "observacion":observacion,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q4 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q4:', error);
    return { mensaje: 'Error Q4'};
  }
 }
 async guardarQuintaPregunta() {
  let imagen=this.quintoFormGroup.get("chasis")?.value??'';
  let observacion= await this._chatGptService.coincideVIN(imagen,this.vin);
  if(observacion == false){
    this.mensajesError("Error imagen chasis...Continua el procesamiento");
  }
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 5",
    "imagen":imagen,
    "observacion":observacion,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q5 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q5:', error);
    return { mensaje: 'Error Q5'};
  }
 }
 async guardarSextaPregunta() {
  let imagen=this.sextoFormGroup.get("frontalVehiculo")?.value??'';
  let observacion= await this._chatGptService.comprobarPlaca(imagen,this.placa);
  if(observacion == false){
    this.mensajesError("Error imagen frontal del vehiculo...Continua el procesamiento");
  }
  if (observacion) {
    const pregunta = {
      "cedula":this.cedula,
      "aseguradora":this.aseguradora,
      "nro_caso":this.caso,
      "seccion":"Seccion 6",
      "imagen":imagen,
      "observacion":observacion,
      "fecha": (new Date).toDateString,
      "latitud":this.latitud,
      "longitud":this.longitud,
    };
    try {
      const respuesta = await this._formService.guardarInspeccion(pregunta);
      return { mensaje: 'Q6 OK', respuesta: respuesta };
    } catch (error) {
      console.error('Error en Q6:', error);
      return { mensaje: 'Error Q6'};
    }
  } else {
    return 'Error Placa';
  }

 }
 async guardarSeptimaPregunta() {
  let imagen=this.septimoFormGroup.get("posteriorVehiculo")?.value??'';
  let observacion= await this._chatGptService.comprobarPlaca(imagen,this.placa);
  if(observacion == false){
    this.mensajesError("Error imagen  posterior del vehiculo...Continua el procesamiento");
  }
  if (observacion) {
    const pregunta = {
      "cedula":this.cedula,
      "aseguradora":this.aseguradora,
      "nro_caso":this.caso,
      "seccion":"Seccion 7",
      "imagen":imagen,
      "observacion":observacion,
      "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
    };
    try {
      const respuesta = await this._formService.guardarInspeccion(pregunta);
      return { mensaje: 'Q7 OK', respuesta: respuesta };
    } catch (error) {
      console.error('Error en Q7:', error);
      return { mensaje: 'Error Q7'};
    }
  } else {
    return 'Error Placa';
  }
 }
 async guardarOctavaPregunta() {
  let imagen=this.octavoFormGroup.get("izquierdaVehiculo")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 8",
    "imagen":imagen,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q8 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q8:', error);
    return { mensaje: 'Error Q8'};
  }
 }

 async guardarNovenaPregunta() {
  let imagen=this.octavoFormGroup.get("tableroVehiculo")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 9",
    "imagen":imagen,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q9 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q9:', error);
    return { mensaje: 'Error Q9'};
  }
 }
 async guardarDecimaPregunta() {
  let imagen=this.decimoFormGroup.get("panelVehiculo")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 10",
    "imagen":imagen,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q10 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q10:', error);
    return { mensaje: 'Error Q10'};
  }
 }

 async guardarOncePregunta() {
  let imagen=this.onceFormGroup.get("tacometroVehiculo")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 11",
    "imagen":imagen,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q11 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q11:', error);
    return { mensaje: 'Error Q11'};
  }
 }

 async guardarDocePregunta() {
  let imagen=this.doceFormGroup.get("cedula")?.value??'';
  let observacion= await this._chatGptService.esAnversoCedula(imagen);
  if(observacion == false){
    this.mensajesError("Error imagen cedula...Continua el procesamiento");
  }
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 12",
    "imagen":imagen,
    "observacion":observacion,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q12 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q12:', error);
    return { mensaje: 'Error Q12'};
  }
 }
 async guardarTrecePregunta() {
  let imagen=this.doceFormGroup.get("licencia")?.value??'';
  let observacion= await this._chatGptService.esAnversoCedula(imagen);
  if(observacion == false){
    this.mensajesError("Error imagen licencia...Continua el procesamiento");
  }
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 13",
    "imagen":imagen,
    "observacion":observacion,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarInspeccion(pregunta);
    return { mensaje: 'Q13 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q13:', error);
    return { mensaje: 'Error Q13'};
  }
 }
 async guardarCatorcePregunta() {
  let tieneAc=this.catorceFormGroup.get("tieneAccesorio")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 14",
    "observacion":tieneAc,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarObservacion(pregunta);
    return { mensaje: 'Q14 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q14:', error);
    return { mensaje: 'Error Q14'};
  }
 }

 async guardarAccesoriosPregunta() {

  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 15",
    "observacion":this.listaAccesorios,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarAccesorios(pregunta);
    return { mensaje: 'Q15 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q15:', error);
    return { mensaje: 'Error Q15'};
  }
 }

 async guardarDiezochoPregunta() {
  let tieneDaniosVehiculo=this.diezochoFormGroup.get("tieneDaniosVehiculo")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 16",
    "observacion":tieneDaniosVehiculo,
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarObservacion(pregunta);
    return { mensaje: 'Q18 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q18:', error);
    return { mensaje: 'Error Q18'};
  }
 }
 async guardarChoquePregunta() {
  let imagen=this.diezNueveFormGroup.get("danioVehiculo")?.value;
  let problemaVehiculo=this.veinteFormGroup.get("problemaVehiculo")?.value;
  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso,
    "seccion":"Seccion 17",
    "observacion":{
      "nombre":problemaVehiculo,
      "imagen":imagen,
      "precio":"0"
    },
    "fecha": (new Date).toDateString,
    "latitud":this.latitud,
    "longitud":this.longitud,
  };
  try {
    const respuesta = await this._formService.guardarChoque(pregunta);
    return { mensaje: 'Q19 OK', respuesta: respuesta };
  } catch (error) {
    console.error('Error en Q19:', error);
    return { mensaje: 'Error Q19'};
  }
 }
 async guardarFormulario() {

  const pregunta = {
    "cedula":this.cedula,
    "aseguradora":this.aseguradora,
    "nro_caso":this.caso
  };
  try {
    const respuesta = await this._formService.finalizarInspeccion(pregunta);
    return { mensaje: 'Fin OK', respuesta: respuesta };
  } catch (error) {
    console.error('Inspeccion Finalizada:', error);
    return { mensaje: 'Error Fin'};
  }
 }

 mensajesError(mensaje:string){
  let timerInterval: ReturnType<typeof setInterval>;

    Swal.fire({
      title: "Procesando...!",
      html: mensaje,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getHtmlContainer()?.querySelector("b");
        if (timer) {
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        //console.log("I was closed by the timer");
      }
    });
 }

}
