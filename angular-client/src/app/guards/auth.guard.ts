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

  // TODO: any is not listed in the offical documentation
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.http.get<any>('http://localhost:8080/me').pipe(
      map(
        response => {
          if (response.data.isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
          }
        },
      ),
      catchError((err) => {
        debugger
        this.router.navigate(['/login']);
        return of(false);
      })
    );
    // return this.http.get('http://localhost:8080/me').subscribe(
    //   data => {
    //     debugger
    //     return true;
    //   },
    //   error => {
    //     debugger
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //     return false;
    //   }
    // );
  }
}
