import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerBookComponent } from './customer-book.component';
import { CustAuthGuard } from 'src/app/auth/cust-auth.guard';

const routes: Routes = [
  {path: '', component: CustomerBookComponent, canActivate: [CustAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerBookRoutingModule { }
