import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ErrorComponent } from './view/error/error.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {
    path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./view/dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path: 'customer', loadChildren: () => import('./view/customer/customer.module').then(m => m.CustomerModule) },
      { path: 'book', loadChildren: () => import('./view/book/book.module').then(m => m.BookModule)},
      //{ path: 'borrow', loadChildren: () => import('./view/borrow/borrow.module').then(m => m.BorrowModule)},
      { path: 'transaction', loadChildren: () => import('./view/transactions/transaction.module').then(m => m.TransactionModule)},
      { path: 'invoice', loadChildren: () => import('./view/invoice/invoice.module').then(m => m.InvoiceModule)},
      { path: 'customer-book',loadChildren: () => import('./view/customerBook/customer-book.module').then(m => m.CustomerBookModule)},
      { path: 'customer-payment', loadChildren: ()=> import('./view/customerPayment/customer-payment.module').then(m => m.CustomerPaymentModule)}
    ]
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
