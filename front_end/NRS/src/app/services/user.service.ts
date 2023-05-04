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

  private currentUser: User | null = null;
  constructor(private http:HttpClient, private authService: AuthService) { }


  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getUserName():string {
    if(this.currentUser) {
      return this.currentUser.name;
    }
    return '';
  }
  getUserInfo(): Observable<User>{
    const token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get<User>(`${this.profileUrl}`, httpOptions);
  }

}
