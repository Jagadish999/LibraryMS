import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = 'https://localhost:7170/api/';

  constructor(public http: HttpClient) { }

  getAllBooks(json: any): Observable<any> {

    const params = new HttpParams().set('json', JSON.stringify(json));
    return this.http.get(this.apiUrl + 'Book/GetBookDetils', { params });
  }

  setBook(json: any): Observable<any> {

    return this.http.post(this.apiUrl + 'Book/SetBookTsk', { json: JSON.stringify(json) })
  }

  setBorrowDetail(json: any): Observable<any>{
    return this.http.post(this.apiUrl  + 'Borrow/SetBorrowDetail', {json: JSON.stringify(json)})
  }
}
