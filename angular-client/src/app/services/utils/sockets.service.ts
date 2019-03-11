import { Injectable, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { emit } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class SocketsService implements OnDestroy {

  // Our socket connection
  private socket;

  constructor() { }

  connect(user) {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.apiUrl` as `http://localhost:5000`
    this.socket = io(environment.apiUrl, {query: 'userId=' + user.userId});

    // this.socket.emit('message', 'test');
  }

  on(key: string, callback: Function) {
    this.socket.on(key, callback);
  }

  emit(key: string, data: any) {
    this.socket.emit(key, data);
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
