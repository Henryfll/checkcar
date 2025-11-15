import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  url=environment.url_back;

  constructor(
    public _http:HttpClient
  ) { }

  validarUsuario(usuario:string,pin:string){
    let jsonEnvio={
      "usuario": usuario,
      "clave":pin
    };
    let url_ws=`${this.url}public/loginAplicacion`;
   return this._http.post(url_ws,jsonEnvio);
  }
}
