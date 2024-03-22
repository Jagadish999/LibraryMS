import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl = 'https://localhost:7170/api/';

  constructor(public http: HttpClient) { }

  getDashboardDetails(json:any): Observable<any>{

    const params = new HttpParams().set('json', JSON.stringify(json));

    return this.http.get(this.apiUrl + 'Common/GetAdminDashboardData', {params});
  }
}
