import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPaymentRoutingModule } from './customer-payment-routing.module';
import { CustomerPaymentComponent } from './customer-payment.component';


@NgModule({
  declarations: [
    CustomerPaymentComponent
  ],
  imports: [
    CommonModule,
    CustomerPaymentRoutingModule
  ]
})
export class CustomerPaymentModule { }
