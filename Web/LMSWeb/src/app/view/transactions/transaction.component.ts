import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { TraansactionSettelmentComponent } from './traansaction-settelment/traansaction-settelment.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [];
  selectedIndex: any;

  constructor(public ts: TransactionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBorrowTransaction();
  }
  getBorrowTransaction(){

    const json = {};
    this.ts.getBorrowTransaction(json).subscribe(res => {
      
      if(res){
        console.log(res);

        this.dataSource = res.data;
        this.displayedColumns = res.column;
      }
    })
  }

  transactionDetails(transaction: any){

    const dialogRef = this.dialog.open(TraansactionSettelmentComponent, {
      data: {
        specificTransaction: transaction,
        mode: "show"
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(res => {
      this.getBorrowTransaction();
    })
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }

}
