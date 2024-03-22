import { Component, OnInit } from '@angular/core';
import { CustomerPaymentService } from './customer-payment.service';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.scss']
})
export class CustomerPaymentComponent implements OnInit {

  dataSource: any = [];
  displayedColumns: string[] = [];

  currentUser: any;

  constructor(public cps: CustomerPaymentService) { }

  ngOnInit(): void {

    this.initializePaymentData();
  }

  initializePaymentData(){

    const currentUser: any = localStorage.getItem('user');
    this.currentUser = JSON.parse(currentUser);
    const json = {
      userId: this.currentUser.userId
    }


    this.cps.getSpecificPayments(json).subscribe(res => {
      
      console.log("Borrowed books")
      
      if(res){
        
          console.log(res[0])
          this.displayedColumns = res[0].column;
          this.dataSource = res[0].paymentDetails;
        }
      })
      
  }

}
