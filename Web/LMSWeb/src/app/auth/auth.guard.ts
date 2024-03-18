import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(public router: Router){

  }

  // Allow if the user is logged
  canActivate(): boolean {

    const currentUser: any = localStorage.getItem('user');
    
    if(currentUser) return true;

    this.router.navigate(['login']);
    return false;
  }
  
}
