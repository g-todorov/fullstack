import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/register`, { email: email, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (this.cookieService.check('node-server-token')) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/login`, { email: email, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response

        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.cookieService.delete('test');
  }
}

