import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, catchError } from 'rxjs/operators';

import { UserService, SocketsService } from '../services';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private socketsService: SocketsService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.http.get<any>(`${environment.apiUrl}me`).pipe(
      map((response) => {
          if (response.data.isAuthenticated) {
            this.userService.setUser(response.data.user);
            this.socketsService.connect(response.data.user);
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
