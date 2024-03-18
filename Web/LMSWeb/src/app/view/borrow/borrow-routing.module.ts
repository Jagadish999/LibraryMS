import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowComponent } from './borrow.component';
import { AdminGuardGuard } from 'src/app/auth/admin-guard.guard';

const routes: Routes = [
  {path: '', component: BorrowComponent, canActivate: [AdminGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowRoutingModule { }
