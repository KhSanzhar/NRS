import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:8000/login/';

  constructor(private http: HttpClient) { }

  getProtectedData(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('access_token')
    });

    return this.http.get(this.apiUrl + '/protected', { headers: headers });
  }
}
