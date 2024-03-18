import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from './book-form/book-form.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

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


  dataSource: any;
  displayedColumns: string[] = [];

  selectedIndex: any;

  constructor(public bs: BookService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.getBookDetails();
  }

  getBookDetails() {
    const json = {};

    this.bs.getAllBooks(json).subscribe(
      res => {
        this.dataSource = res.data;
        this.displayedColumns = res.column;

        console.log(this.dataSource)
      }
    )
  }

  openForm() {
    const dialogRef = this.dialog.open(BookFormComponent, {
      data: {
        data: '',
        mode: 'Add'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {

      this.getBookDetails();
    });
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }
}
