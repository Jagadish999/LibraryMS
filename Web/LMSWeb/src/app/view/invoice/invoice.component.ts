import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [];
  selectedIndex: any;

  constructor(public is: InvoiceService) { }

  ngOnInit(): void {
    this.getInvoiceService();
  }

  getInvoiceService(){

    const json = {};
    this.is.getInvoiceDetails(json).subscribe(res => {
      console.log(res);

      this.dataSource = res[0].paymentDetails;
      this.displayedColumns = res[0].column;

      console.log(this.dataSource);
      console.log(this.displayedColumns);

    })
  }

  selectedRowDetail(row: any, i: number) {
    this.selectedIndex = row;
    this.selectedIndex = i;
  }

}
