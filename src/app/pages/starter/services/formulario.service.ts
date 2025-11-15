import { U } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Junta } from '../interfaces/junta';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

   url=environment.url_back;


  constructor(
    public _http:HttpClient
  ) { }


   buscarJuntasCedulaCelular(cedula: string, celular:string) {
    const jsonEnvio = {
      cedula: cedula,
      celular:celular
    };
    let url_final=`${this.url}private/buscarJuntasPorCedulaCelular`;
    return this._http.post(url_final, jsonEnvio);
  }

   guardarJunta(junta:Junta) {
    const jsonEnvio = {
      codigo: junta.codigo,
      sufragantes:junta.sufragantes,
      blancos: junta.blancos,
      nulos:junta.nulos,
      si:junta.si,
      no:junta.no,
      estDelegado:junta.estDelegado,
      obsDelegado:junta.obsDelegado,
      voluntario:junta.voluntario,
      estVotacion:junta.estVotacion,
      instaloJrv:junta.instaloJrv,
      estaManana:junta.estaManana,
      estaTarde:junta.estaTarde,
      usrActualiza:junta.usrActualiza,
      obsVotacion:junta.obsVotacion
    };
    let url_final=`${this.url}private/actualizarJunta`;
    return this._http.post(url_final, jsonEnvio);
  }

  guardarJuntaImagen(junta:Junta, imagen:string) {
    const jsonEnvio = {
      codigo: junta.codigo,
      imagen: imagen
    };
    console.log(jsonEnvio);
    let url_final=`${this.url}private/actualizarJuntaImagen`;
    return this._http.post(url_final, jsonEnvio);
  }

}
