import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const rol = localStorage.getItem('rol')!;
    /*if (currentUser) {
      let esAdmin:boolean=false;
      currentUser.roles.forEach(element => {
        if(element.nomRol=="Administrador"){
          esAdmin=true;
        }
      });
      // check if route is restricted by role
      if (currentUser.token===null) {
        // role not authorised so redirect to not-authorized page
        this._router.navigate(['/pages/authentication/login-v2']);
        return false;
      }else{
        if (esAdmin) {
          return true;
        } else {
          if (state.url.localeCompare("/pages/reportes")==0 || state.url.localeCompare("/pages/escanios")==0  ) {
            this._router.navigate(['/pages/miscellaneous/not-authorized']);
            return false;
          } else {
            return true;
          }

        }
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/pages/authentication/login-v2'], { queryParams: { returnUrl: state.url } });*/
    return false;
  }
}
