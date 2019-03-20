import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './utils/local-storage.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private sourceUser = new BehaviorSubject(this.localStorageService.getItem('user'));
  user = this.sourceUser.asObservable();

  // private _isAuthenticatad = new BehaviorSubject(false);
  // isAuthenticated = this._isAuthenticatad.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    // private socket: Socket,
  ) { }

  public get currentUserValue() {
    return this.sourceUser.value;
  }

  requestUserById(userId: string) {
    return this.apiService.httpGetRequest(`user/${userId}`, { }).pipe(map(response => {
      return response.data;
    }));
  }

  setUser(user: object) {
    this.sourceUser.next(user);
  }
}
