
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if(token){
    if(tokenExpired(token)){
      router.navigate(['/authentication/login']);
    }
    req = token
    ? req.clone({ setHeaders: { Authorization: `${token}` } })
    : req;
  }

  return next(req);
};


  function  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
 }
