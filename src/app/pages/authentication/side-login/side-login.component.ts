import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AutenticacionService } from './services/autenticacion.service';
import { Autenticacion } from './interfaz/autenticacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  constructor(
    private router: Router,
    private _autenticationService:AutenticacionService,
  ) {

      /*const rol= localStorage.getItem('rol')!;
      if(rol!='OPERADOR'){
        this.router.navigate(['/inscripcion']);
      }
      if(rol!='DELEGADO'){
         this.router.navigate(['/dashboard']);
      }*/
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    pin: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
     localStorage.clear();

     let cedula:string=this.form.get("username")?.value?? "";
     localStorage.setItem('cedula', cedula);
     let pin=this.form.get("pin")?.value?? "";
     this._autenticationService.validarUsuario(cedula,pin).subscribe(
      (respuesta:any)=>{
          console.log(respuesta);
          if(respuesta.accesoConcedido==true){
            localStorage.setItem('token', respuesta.token);
            localStorage.setItem('codigoUsuario', respuesta.codUsuario);
            localStorage.setItem('rol', respuesta.rol);
            localStorage.setItem('celular', respuesta.celular);
            localStorage.setItem('usuario', respuesta.usuario);
            if(respuesta.rol=="DELEGADO"){
              this.router.navigate(['/dashboard']);
            }
            if(respuesta.rol=="OPERADOR"){
              this.router.navigate(['/inscripcion']);
            }
          }else{
            Swal.fire('Usuario/Clave incorrectos','','error');
          }

      },
      (error)=>{
        Swal.fire('Error en el ingreso','','error');
        this.router.navigate(['/']);
      },
     );

  }
}
