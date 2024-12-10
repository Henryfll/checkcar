import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {


  constructor(
    public _http:HttpClient
  ) { }

  validarUsuario(usuario:string,pin:string){
    let jsonEnvio={
      "cedula": usuario,
      "pin":pin
    };
    let url_ws=`https://sistema.saferisk.ec/SW_AutoInspeccion/api/ValidaUsuario`;
   return this._http.post(url_ws,jsonEnvio);
  }
}
