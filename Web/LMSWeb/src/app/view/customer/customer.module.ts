import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';

import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    CustomerComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatStepperModule,
    MatPaginatorModule
  ]
})
export class CustomerModule { }
