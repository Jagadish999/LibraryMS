import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { AdminGuardGuard } from 'src/app/auth/admin-guard.guard';

const routes: Routes = [
  {path: '', component: TransactionComponent, canActivate: [AdminGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
