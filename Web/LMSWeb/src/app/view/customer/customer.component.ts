import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [];
  selectedIndex: any;

  membershipTypes: any;
  userTypes: any;
  paymentTypes: any;


  constructor(public cs: CustomerService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {

    this.initializeCustomer();
  }
  
  initializeCustomer(){

    const json = {};
  
    this.cs.getCustomer(json).subscribe(res => {

      if (res) {
        
        this.dataSource = res.data;
        this.displayedColumns = res.column;
        this.membershipTypes = res.membershipTypeDetails;
        this.userTypes = res.userTypes;
        this.paymentTypes = res.paymentTypes;
      }
    });

  }

  openForm() {

    console.log(this.membershipTypes);
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      data: {
        memberType: this.membershipTypes,
        userType: this.userTypes,
        paymentType: this.paymentTypes,
        mode: 'Add'
      },
      disableClose: true,
      width: '30vw'
    });


    dialogRef.afterClosed().subscribe(res => {

      this.initializeCustomer();
    });
  }

  editForm(userRecord: any) {

    const specificMembershipType = [];
    specificMembershipType.push(this.membershipTypes.find((memType: any) => memType.membershipTypeName === userRecord.membershipType));

    const dialogRef = this.dialog.open(AddCustomerComponent, {
      data: {
        memberType: specificMembershipType,
        userType: this.userTypes,
        paymentType: this.paymentTypes,
        mode: 'Edit',
        currentUserDetail: userRecord
      },
      disableClose: true,
      width: '30vw'
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.initializeCustomer();
    });

  }

  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }

}
