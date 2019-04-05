import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private userService: UserService,
  ) { }

  register(email: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/register`, { email: email, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/login`, { email: email, password: password })
      .pipe(map(response => {
        // login successful if there's a jwt token in the response
        if (response.user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          this.userService.setUser(response.user);
        }

        return response.user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    return this.http.get<any>(`http://localhost:8080/logout`).pipe(map(response => {
      debugger
      if (response) {
      }

      return response;
    }));
    // this.cookieService.delete('authService');
  }
}

