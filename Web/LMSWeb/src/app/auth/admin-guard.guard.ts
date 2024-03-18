import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {


  constructor(public router: Router, public _location: Location) {

  }

  // Allow if the user is admin
  canActivate(): boolean {

    const currentUser: any = localStorage.getItem('user');

    if (currentUser && JSON.parse(currentUser).userType === 'ADMIN') return true;

    this._location.back();
    return false;

  }

}
