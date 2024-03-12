import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  apiUrl = 'https://localhost:7170/api/';
  constructor(public http: HttpClient) { }

  // Get User details based on email and password
  getUserDetail(userDetailJson: any): Observable<any>{
    const params = new HttpParams().set('json', JSON.stringify(userDetailJson));
    return this.http.get(this.apiUrl + 'User/GetUser', {params});
  }
}
