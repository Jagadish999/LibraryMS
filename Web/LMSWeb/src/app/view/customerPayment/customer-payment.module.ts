import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerPaymentRoutingModule } from './customer-payment-routing.module';
import { CustomerPaymentComponent } from './customer-payment.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    CustomerPaymentComponent
  ],
  imports: [
    CommonModule,
    CustomerPaymentRoutingModule,
    MatIconModule,
    MatTableModule
  ]
})
export class CustomerPaymentModule { }
