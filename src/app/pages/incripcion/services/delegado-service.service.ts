import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Delegado } from '../interfaces/delegado';

@Injectable({
  providedIn: 'root'
})
export class DelegadoServiceService {

   url=environment.url_back;


    constructor(
      public _http:HttpClient
    ) { }

    listarJuntas() {
      let url_final=`${this.url}private/listarJuntas`;
      return this._http.get(url_final);
    }

guardarDelegado(delegado:Delegado) {
    let url_final=`${this.url}private/guardarDelegado`;
    return this._http.post(url_final, delegado);
  }

  listarDelegadosPorJunta(junta:number) {
    let jsonEnvio={
      junta:junta
    }
    let url_final=`${this.url}private/buscarDelegadoJunta`;
    return this._http.post(url_final, jsonEnvio);
  }
}
