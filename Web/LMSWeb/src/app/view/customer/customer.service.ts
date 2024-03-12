import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:7170/api/';
  
  constructor(public http: HttpClient) { }
  
  // set customer for library
  setUser(jsonData: any): Observable<any>{

    return this.http.post(this.apiUrl  + 'User/CustomerUserTsk', {json: JSON.stringify(jsonData)})
  }

  // get all customer
  getCustomer(json: any): Observable<any> {

    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Common/GetCustomerTblDetail', {params});
  }

}
