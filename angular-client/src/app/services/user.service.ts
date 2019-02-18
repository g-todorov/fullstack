import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';

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
  ) { }

  public get currentUserValue() {
    return this.sourceUser.value;
}

  // isAuthenticatedRequest() {
  // this.apiService.httpGetRequest('me', {}).subscribe(
  //   data => {
  //     console.log(data);
  //   },
  //   error => {
  //     console.log(error);
  //   });
  // }

  setUser(user: object) {
    this.localStorageService.setItem('user', user);
    this.sourceUser.next(user);
  }
}
