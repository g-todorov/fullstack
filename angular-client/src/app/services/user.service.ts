import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from './utils/local-storage.service';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sourceUser = new BehaviorSubject(this.localStorageService.getItem('user'));
  user = this.sourceUser.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
  ) { }

  public get currentUserValue() {
    return this.sourceUser.value;
  }

  requestUserById(userId: string) {
    return this.apiService.httpGetRequest(`/users/${userId}`, { }).pipe(map(response => {
      return response.data;
    }));
  }

  setUser(user: object) {
    this.sourceUser.next(user);
  }
}
