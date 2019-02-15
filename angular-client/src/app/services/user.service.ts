import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private sourceUser = new BehaviorSubject(this.localStorageService.getItem('user'));
  user = this.sourceUser.asObservable();

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  public get currentUserValue() {
    return this.sourceUser.value;
}

  // isAuthenticated(flag: boolean) {
  //   if(this.localStorageService.getItem('isAthenticated')) {
  //     return true;
  //   }
  // }

  setUser(user: object) {
    this.localStorageService.setItem('user', user);
    this.sourceUser.next(user);
  }
}
