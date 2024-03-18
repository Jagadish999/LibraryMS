import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { AdminGuardGuard } from 'src/app/auth/admin-guard.guard';

const routes: Routes = [
  {path: '', component: InvoiceComponent, canActivate: [AdminGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
