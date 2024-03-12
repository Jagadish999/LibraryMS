import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [];

  selectedIndex: any;

  constructor(public cs:CustomerService, public dialog:MatDialog) { }

  ngOnInit(): void {

    const json = {};

    this.cs.getCustomer(json).subscribe(res => {
      if(res){

        this.dataSource = res.data;
        this.displayedColumns = res.column;
      }
    });
  }

  openForm(){
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      data: {
        data: '',
        mode: 'Add'
      },
      disableClose: true
    })
  }
  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }

}
