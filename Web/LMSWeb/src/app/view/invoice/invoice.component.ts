import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from './invoice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  selectedIndex: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator; 

  constructor(public is: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoiceService();
  }

  getInvoiceService(){

    const json = {};
    this.is.getInvoiceDetails(json).subscribe(res => {
      console.log(res);

      this.dataSource =  new MatTableDataSource<any>(res[0].paymentDetails);
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = res[0].column;
    })
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }

}
