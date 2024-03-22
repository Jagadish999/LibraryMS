import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerBookRoutingModule } from './customer-book-routing.module';
import { CustomerBookComponent } from './customer-book.component';

import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    CustomerBookComponent
  ],
  imports: [
    CommonModule,
    CustomerBookRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule
  ]
})
export class CustomerBookModule { }
