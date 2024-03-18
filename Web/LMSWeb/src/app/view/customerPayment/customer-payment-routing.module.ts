import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPaymentComponent } from './customer-payment.component';
import { CustAuthGuard } from 'src/app/auth/cust-auth.guard';

const routes: Routes = [
  {path: '', component: CustomerPaymentComponent, canActivate: [CustAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPaymentRoutingModule { }
