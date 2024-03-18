import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowComponent } from './borrow.component';


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
import { BorrowFormComponent } from './borrow-form/borrow-form.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BorrowComponent,
    BorrowFormComponent
  ],
  imports: [
    CommonModule,
    BorrowRoutingModule,
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
    MatButtonModule
  ]
})
export class BorrowModule { }
