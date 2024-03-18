import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';

import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatTableModule } from '@angular/material/table';

import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BookFormComponent } from './book-form/book-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BookComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
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
    MatButtonModule
  ]
})
export class BookModule { }
