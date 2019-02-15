import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})

// export class AuthGuard implements CanActivate, CanActivateChild {
export class AuthGuard implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private userService: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.userService.currentUserValue;

    if (this.cookieService.check('node-server-token') && currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
