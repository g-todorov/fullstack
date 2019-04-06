import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

import { environment } from '../../environments/environment';

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
    return this.http.post<any>(`${environment.apiUrl}/register`, { email: email, password: password })
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
    return this.http.post<any>(`${environment.apiUrl}/login`, { email: email, password: password })
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
    return this.http.get<any>(`${environment.apiUrl}/logout`).pipe(map(response => response));
  }
}

