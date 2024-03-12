import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
    if(localStorage.getItem('user')){
      return true; 
    }
    else{
      this.router.navigate(['register']);
      return false;
    }
*/
export class AuthGuard implements CanActivate {

  constructor(public router: Router){

  }


  canActivate(): boolean {
    
    if(localStorage.getItem('user')) return true;

    this.router.navigate(['login'])
    return false;
  }
  
}
