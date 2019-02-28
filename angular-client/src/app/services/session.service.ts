import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sourceSession = new BehaviorSubject(null);
  session = this.sourceSession.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  requestSessions(userId: string) {
    return this.apiService.httpGetRequest('session', { params: { id: userId } }).subscribe(data => {
      this.sourceSession.next(data.sessions);
    });
  }
}
