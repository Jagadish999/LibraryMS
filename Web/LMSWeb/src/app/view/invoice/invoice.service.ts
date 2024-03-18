import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  /*
    apiUrl = 'https://localhost:7170/api/';

  constructor(public http: HttpClient) { }

  getBorrowTransaction(json: any): Observable<any>{

    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Borrow/GetBorrowTransactionDetail', {params});
  }
  */

  apiUrl = 'https://localhost:7170/api/';

  constructor(public http: HttpClient) { }

  getInvoiceDetails(json: any): Observable<any> {

    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Payment/GetPaymentDetailSel', {params});
  }
}
