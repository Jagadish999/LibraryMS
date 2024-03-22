import { Component, Inject, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BorrowService } from '../../borrow/borrow.service';

@Component({
  selector: 'app-traansaction-settelment',
  templateUrl: './traansaction-settelment.component.html',
  styleUrls: ['./traansaction-settelment.component.scss']
})
export class TraansactionSettelmentComponent implements OnInit {

  transactionDetail: any;



  constructor(
    public ts: TransactionService,
    public bs: BorrowService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TraansactionSettelmentComponent>,
  ) { }

  ngOnInit(): void {

    this.transactionDetail = this.data.specificTransaction;

    console.log(this.transactionDetail);
  }

  bookReturned(){

    const currentUser:any = localStorage.getItem('user');

    const chargeFee =  this.transactionDetail.holdingDays > this.transactionDetail.allowedHolding ? ((this.transactionDetail.holdingDays - this.transactionDetail.allowedHolding) * this.transactionDetail.lateCharge) : 0;

    const json = {
      borrowId: this.transactionDetail.borrowId,
      bookId: this.transactionDetail.bookId,
      userId: this.transactionDetail.userId,
      fee: chargeFee,
      userPersonId: JSON.parse(currentUser).userId
    }

    this.bs.setBorrowDetail(json).subscribe(res => {

      if(res) {
        this.snackBar.open("Book Returned Successfully", "OK");
        this.dialogRef.close(res);
      }
    },
    error => {
      this.snackBar.open("Connection Error", "OK");
    });


  }

}
