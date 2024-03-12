import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [];

  selectedIndex: any;

  constructor(public bs: BookService) { }

  ngOnInit(): void {

    this.getBookDetails();
  }

  getBookDetails(){
    const json = {};

    this.bs.getAllBooks(json).subscribe(
      res => {
        this.dataSource = res.data;
        this.displayedColumns = res.column

        console.log(this.dataSource, this.displayedColumns)
      }
    )
  }

  openForm(){

  }
  
  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }
}
