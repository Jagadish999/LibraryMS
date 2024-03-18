import { Component, OnInit } from '@angular/core';
import { CustomerBookService } from './customer-book.service';

@Component({
  selector: 'app-customer-book',
  templateUrl: './customer-book.component.html',
  styleUrls: ['./customer-book.component.scss']
})
export class CustomerBookComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [];

  selectedIndex: any;

  constructor(public cbs: CustomerBookService) { }

  ngOnInit(): void {

    this.getCustomerBookDetails();
  }

  getCustomerBookDetails(){

    const currentUser: any = localStorage.getItem('user');
    const json = {
      userId: JSON.parse(currentUser).userId
    }

    this.cbs.getBorrowedBooks(json).subscribe(res => {

      this.dataSource = res.data;
      this.displayedColumns = res.column;

    })

  }

  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }

}
