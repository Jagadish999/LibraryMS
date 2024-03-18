import { Component, OnInit } from '@angular/core';
import { BorrowService } from './borrow.service';
import { MatDialog } from '@angular/material/dialog';
import { BorrowFormComponent } from './borrow-form/borrow-form.component';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [];

  userDetails: any;

  selectedIndex: any;

  constructor(public bs: BorrowService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBorrowDetails();
  }

  getBorrowDetails(){

    const json = {};
    this.bs.getBorrowDetail(json).subscribe(res =>{
      console.log(res);
      this.dataSource = res.bookDetails;
      this.displayedColumns = res.column;
      this.userDetails = res.userDetails;
    })
  }

  borrowBookForm(bookColumn: any){

    const dialogRef = this.dialog.open(BorrowFormComponent, {
      data: {
        bookDetails: bookColumn,
        userDetails: this.userDetails,
        mode: 'Add'
      },
      disableClose: true,
      width: '30vw'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getBorrowDetails();
    })
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }

}
