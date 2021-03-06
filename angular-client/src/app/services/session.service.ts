import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';
import { SocketsService } from './utils/sockets.service';
import { SessionStates } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sourceSession = new BehaviorSubject(null);
  session = this.sourceSession.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private socketService: SocketsService,
  ) { }

  requestSessions(query: any) {
    return this.apiService.httpGetRequest('/sessions', { params: query }).subscribe(data => {
      this.sourceSession.next(data.sessions);
    });
  }

  requestSessionById(sessionId: string) {
    return this.apiService.httpGetRequest(`/sessions/${sessionId}`, { }).pipe(map(response => {
      return response.session;
    }));
  }

  updateSessionStatus(sessionId: string, status: string) {
    if (status === SessionStates.CLOSED) {
      status = SessionStates.OPENED;
    } else {
      status = SessionStates.CLOSED;
    }

    return this.apiService.httpPutRequest(`/sessions/${sessionId}`, { status } ).subscribe(data => {
      this.sourceSession.next(data.sessions);
    });
  }

  onSessionUpdated(query: any) {
    this.socketService.on('sessionUpdated', data => {
      this.requestSessions(query);
    });
  }
}
