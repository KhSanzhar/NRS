import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8000/profile/';


  constructor(private http: HttpClient) { }

  registerUser(username: string, password: string): Observable<any>{
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.apiUrl}register/`, data);
  }
}
