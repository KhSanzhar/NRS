import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Token} from '../modules/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'myapp-token';
  private apiUrl = 'http://localhost:8000/profile/';

  // private logoutUrl = 'http://localhost:8000/profile/logout/';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<Token> {
    const data = {username, password};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    // const token = this.getToken();
    // console.log('Authorization: ', `Bearer ${token}`);



    return this.http.post<Token>(`${this.apiUrl}login/`, data, httpOptions).pipe(
      tap((response: Token) => {
          localStorage.setItem(this.TOKEN_KEY, response.access);
        })
    );


  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  }

  getToken(): string {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token ? token : '';
  }

}
