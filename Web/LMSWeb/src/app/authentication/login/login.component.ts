import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // For showing and hiding password
  hidePassword: boolean = true;

  //Form Group values
  loginDetails: FormGroup;

  // Initialize form builder
  constructor(
    public as: AuthenticationService,
    public router: Router,
    public fb: FormBuilder,
    public snackBar: MatSnackBar,

  ) {


    // if (localStorage.getItem('user')) {
    //   this.router.navigate(['navigation/customer']);
    // }

    this.loginDetails = this.fb.group({
      email: fb.control('parajulijagadish9@gmail.com', [Validators.required, Validators.maxLength(50), Validators.email]),
      password: fb.control('password123', [Validators.required, Validators.maxLength(20), Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
  }

  login() {

    const json = {
      emailAddress: this.loginDetails.get('email')?.value,
      password: this.loginDetails.get('password')?.value
    }

    // Call get method
    this.as.getUserDetail(json).subscribe(
      res => {

        // If response is invalid
        if (res === null || Object.keys(res).length === 0) {

          this.snackBar.open("Invalid User Details", "OK", {
            duration: 3000
          });
        }
        else {

          const loggedUser = res[0];
          const user = JSON.stringify(loggedUser);
          localStorage.setItem('user', user);

          if (loggedUser.userType === 'ADMIN') {

            this.router.navigate(['navigation/customer']);
            console.log('admin');
          }
          else {
            console.log('customer')
            this.router.navigate(['navigation/customer-book']);
          }


          this.snackBar.open("Welcome, " + loggedUser.fullName, "OK", {
            duration: 3000
          });
        }
      },
      error => {

        this.snackBar.open("Error occurred while fetching user details", "OK");
      }
    );

  }

}

