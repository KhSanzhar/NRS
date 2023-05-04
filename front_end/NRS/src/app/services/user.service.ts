import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../modules/User";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  profileUrl = 'http://localhost:8000/profile/';
  constructor(private http:HttpClient, private authService: AuthService) { }

  getUserInfo(userId: number): Observable<User>{
    const token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get<User>(`${this.profileUrl}/${userId}`, httpOptions);
  }
}
