import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ErrorComponent } from './view/error/error.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: NavigationComponent, canActivate: [AuthGuard],
    children: [
      { path: 'customer', loadChildren: () => import('./view/customer/customer.module').then(m => m.CustomerModule) },
      { path: 'book', loadChildren: () => import('./view/book/book.module').then(m => m.BookModule)}
    ]
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
