import { U } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accesorio } from '../interfaces/accesorio';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

   url="https://sistema.saferisk.ec/SW_AutoInspeccion/api/DatosInspeccion";


  constructor(
    public _http:HttpClient
  ) { }

  /*guardarInspeccion(inspeccion:any){
    let jsonEnvio={
      "cedula":inspeccion.cedula,
      "aseguradora":inspeccion.aseguradora,
      "nro_caso":inspeccion.nro_caso,
      "seccion":inspeccion.seccion,
      "imagen":inspeccion.imagen
    };

   return this._http.post(this.url,jsonEnvio);
  }

  guardarObservacion(inspeccion:any){
    let jsonEnvio={
      "cedula":inspeccion.cedula,
      "aseguradora":inspeccion.aseguradora,
      "nro_caso":inspeccion.nro_caso,
      "seccion":inspeccion.seccion,
      "observacion":inspeccion.observacion
    };

   return this._http.post(this.url,jsonEnvio);
  }
  guardarAccesorios(inspeccion:any){
    let jsonEnvio={
      "cedula":inspeccion.cedula,
      "aseguradora":inspeccion.aseguradora,
      "nro_caso":inspeccion.nro_caso,
      "seccion":inspeccion.seccion,
      "observacion":inspeccion.accesorios
    };

   return this._http.post(this.url,jsonEnvio);
  }

  guardarChoque(inspeccion:any){
    let jsonEnvio={
      "cedula":inspeccion.cedula,
      "aseguradora":inspeccion.aseguradora,
      "nro_caso":inspeccion.nro_caso,
      "seccion":inspeccion.seccion,
      "observacion":{
        "nombre":inspeccion.obsnombre,
		    "imagen":inspeccion.obsimagen,
		    "precio":inspeccion.obsprecio
      }
    };

   return this._http.post(this.url,jsonEnvio);
  }
  finalizarInspeccion(inspeccion:any){
    let jsonEnvio={
      "cedula":inspeccion.cedula,
      "aseguradora":inspeccion.aseguradora,
      "nro_caso":inspeccion.nro_caso
    };

   return this._http.post(this.url,jsonEnvio);
  }*/
   guardarInspeccion(inspeccion: any): Promise<any> {
    const jsonEnvio = {
      cedula: inspeccion.cedula,
      aseguradora: inspeccion.aseguradora,
      nro_caso: inspeccion.nro_caso,
      seccion: inspeccion.seccion,
      imagen: inspeccion.imagen,
      observacion: inspeccion.observacion,
      fechaHora: inspeccion.fecha,
      latitud:inspeccion.latitud,
      longitud:inspeccion.longitud,
      precio:inspeccion.precio
    };
    return lastValueFrom(this._http.post(this.url, jsonEnvio));
  }

  guardarObservacion(inspeccion: any): Promise<any> {
    const jsonEnvio = {
      cedula: inspeccion.cedula,
      aseguradora: inspeccion.aseguradora,
      nro_caso: inspeccion.nro_caso,
      seccion: inspeccion.seccion,
      observacion: inspeccion.observacion,
      fechaHora: inspeccion.fecha,
      latitud:inspeccion.latitud,
      longitud:inspeccion.longitud,
      precio:inspeccion.precio
    };
    return lastValueFrom(this._http.post(this.url, jsonEnvio));
  }

  guardarAccesorios(inspeccion: any): Promise<any> {
    const jsonEnvio = {
      cedula: inspeccion.cedula,
      aseguradora: inspeccion.aseguradora,
      nro_caso: inspeccion.nro_caso,
      seccion: inspeccion.seccion,
      observacion: inspeccion.accesorios,
      fechaHora: inspeccion.fecha,
      latitud:inspeccion.latitud,
      longitud:inspeccion.longitud,
      precio:inspeccion.precio
    };
    return lastValueFrom(this._http.post(this.url, jsonEnvio));
  }

  guardarChoque(inspeccion: any): Promise<any> {
    const jsonEnvio = {
      cedula: inspeccion.cedula,
      aseguradora: inspeccion.aseguradora,
      nro_caso: inspeccion.nro_caso,
      seccion: inspeccion.seccion,
      observacion: {
        nombre: inspeccion.obsnombre,
        imagen: inspeccion.obsimagen,
        precio: inspeccion.obsprecio,
      },
      fechaHora: inspeccion.fecha,
      latitud:inspeccion.latitud,
      longitud:inspeccion.longitud,
      precio:inspeccion.precio
    };
    return lastValueFrom(this._http.post(this.url, jsonEnvio));
  }

  finalizarInspeccion(inspeccion: any): Promise<any> {
    const jsonEnvio = {
      cedula: inspeccion.cedula,
      aseguradora: inspeccion.aseguradora,
      nro_caso: inspeccion.nro_caso,
    };
    return lastValueFrom(this._http.post(this.url, jsonEnvio));
  }
}
