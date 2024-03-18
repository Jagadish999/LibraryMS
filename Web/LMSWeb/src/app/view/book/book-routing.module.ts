import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { AdminGuardGuard } from 'src/app/auth/admin-guard.guard';

const routes: Routes = [
  {path: '', component: BookComponent, canActivate: [AdminGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
