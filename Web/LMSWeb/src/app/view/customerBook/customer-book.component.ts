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

  bookImages = [
    "https://via.placeholder.com/150?text=Book1",
    "https://via.placeholder.com/150?text=Book2",
    "https://via.placeholder.com/150?text=Book3",
    "https://via.placeholder.com/150?text=Book4",
    "https://via.placeholder.com/150?text=Book5",
    "https://via.placeholder.com/150?text=Book6",
    "https://via.placeholder.com/150?text=Book7",
    "https://via.placeholder.com/150?text=Book8",
    "https://via.placeholder.com/150?text=Book9",
    "https://via.placeholder.com/150?text=Book10",
    "https://via.placeholder.com/150?text=Book11",
    "https://via.placeholder.com/150?text=Book12",
    "https://via.placeholder.com/150?text=Book13",
    "https://via.placeholder.com/150?text=Book14",
    "https://via.placeholder.com/150?text=Book15",
    "https://via.placeholder.com/150?text=Book16",
    "https://via.placeholder.com/150?text=Book17",
    "https://via.placeholder.com/150?text=Book18",
    "https://via.placeholder.com/150?text=Book19",
    "https://via.placeholder.com/150?text=Book20"
  ];

  currentUser: any;

  constructor(public cbs: CustomerBookService) { }

  ngOnInit(): void {

    const user: any = localStorage.getItem('user');
    this.currentUser = JSON.parse(user);
    this.getCustomerBookDetails();
  }

  getCustomerBookDetails() {

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
