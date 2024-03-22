import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  shortSideNav: boolean = false;
  selectedIndex: any;

  navClassName: string = 'side-nav long-width-nav';
  mainContentClassName: string = 'main-content short-width-main';

  navigationList: any = [];


  constructor(public router: Router) { }

  ngOnInit(): void {

    this.getNavigation();
    this.initializeData();
  }

  initializeData() {
    this.shortSideNav = false;
  }

  getNavigation() {

    const currentUser: any = localStorage.getItem('user');
    const currentUserType = JSON.parse(currentUser).userType;

    if (currentUserType === 'ADMIN') {

      this.navigationList = [
        {
          navigationUrl: "/navigation/dashboard",
          navigationName: "Dashboard",
          icon: "dashboard"
        },
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
    else if (currentUserType === 'REGULAR') {
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


  // Change side nav to large and small
  changeSideNavSize() {

    this.shortSideNav = !this.shortSideNav;


    if (this.shortSideNav === false) {

      this.navClassName = 'side-nav long-width-nav';
      this.mainContentClassName = 'main-content short-width-main';
    }
    else {
      this.navClassName = 'side-nav short-width-nav';
      this.mainContentClassName = 'main-content long-width-main';
    }
  }

  selectedRowDetail(item: any, k: number) {
    this.selectedIndex = item;
    this.selectedIndex = k;
  }
}