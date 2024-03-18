import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';

import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TraansactionSettelmentComponent } from './traansaction-settelment/traansaction-settelment.component';

@NgModule({
  declarations: [
    TransactionComponent,
    TraansactionSettelmentComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule
  ]
})
export class TransactionModule { }
