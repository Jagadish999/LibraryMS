import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formObject = {
    emailAddress: 'parajulijagadish9@gmail.com',
    password: 'password123'
  }
  constructor(public as: AuthenticationService, public router: Router) { }

  ngOnInit(): void {
  }

  login(){

    const userDetail = this.as.getUserDetail(this.formObject).subscribe(
      res => {

        if(res.length > 0){

          localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['dashboard'])

          //this.router.navigate(['navigation/customer'])
        }
        
      }
    );
  }

}
