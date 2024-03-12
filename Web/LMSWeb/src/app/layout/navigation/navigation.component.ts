import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navigationList: any = [
    {
      navigationUrl: "/dashboard/customer",
      navigationName: "Customer",
      icon: "account_circle"
    },
    {
      navigationUrl: "/dashboard/book",
      navigationName: "Book",
      icon: "book"
    }
  ];
  

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('user');

    this.router.navigate(['login']);
  }
}
