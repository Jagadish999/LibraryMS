import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { AdminGuardGuard } from 'src/app/auth/admin-guard.guard';

const routes: Routes = [
  {path: '', component: CustomerComponent, canActivate: [AdminGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
