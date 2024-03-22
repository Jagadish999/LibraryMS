import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustAuthGuard implements CanActivate {

  constructor(public router: Router, public _location: Location) {

  }

  // Allow if the user is customer
  canActivate(): boolean {

    const currentUser: any = localStorage.getItem('user');

    if (currentUser && JSON.parse(currentUser).userType === 'REGULAR'){
      return true;
    }
    else if(currentUser && JSON.parse(currentUser).userType === 'ADMIN'){

      this.router.navigate(['navigation/customer']);
    }
      

    this._location.back();
    return false;
  }

}
