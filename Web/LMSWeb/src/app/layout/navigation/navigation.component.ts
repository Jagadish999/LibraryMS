import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  //----
  @ViewChild('drawer') drawer!: MatDrawer;
  sidenavOpened = false;
  //---

  navigationList: any = [];


  constructor(public router: Router) { }

  ngOnInit(): void {

    this.getNavigation();

    console.log(MatDrawer)
    
  }

  getNavigation(){

    console.log(localStorage.getItem('user'));

    const currentUser: any = localStorage.getItem('user');
    const currentUserType = JSON.parse(currentUser).userType;

    if(currentUserType === 'ADMIN'){

      this.navigationList = [
      {
        navigationUrl: "/navigation/customer",
        navigationName: "Customer",
        icon: "account_circle"
      },
      {
        navigationUrl: "/navigation/book",
        navigationName: "Book",
        icon: "book"
      },
      {
        navigationUrl: "/navigation/borrow",
        navigationName: "Borrow",
        icon: "handshake"
      },
      {
        navigationUrl: "/navigation/transaction",
        navigationName: "Transaction",
        icon: "monetization_on"
      },
      {
        navigationUrl: "/navigation/invoice",
        navigationName: "Invoice",
        icon: "receipt"
      }
    ];
    }
    else if(currentUserType === 'REGULAR'){
      this.navigationList = [
        {
          navigationUrl: "/navigation/customer-payment",
          navigationName: "Payments",
          icon: "payment"
        },
        {
          navigationUrl: "/navigation/customer-book",
          navigationName: "Books",
          icon: "books"
        }
      ];
    }

  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }


  //---

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
    if (!this.sidenavOpened) {
      // Close the sidenav when it's hidden
      this.drawer.close();
    }
  }

  //---
}


