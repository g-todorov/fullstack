import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { first, map, catchError } from 'rxjs/operators';

import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})

// export class AuthGuard implements CanActivate, CanActivateChild {
export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.http.get<any>('http://localhost:8080/me').pipe(
      map((response) => {
          if (response.data.isAuthenticated) {
            this.userService.setUser(response.data.user);
            return true;
          }
        }
      ),
      catchError((err) => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return of(false);
      })
    );
  }
}
