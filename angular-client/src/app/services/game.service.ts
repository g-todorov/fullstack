import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private sourceGame = new BehaviorSubject(null);
  game = this.sourceGame.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  requestGames(userId: string) {
    return this.apiService.httpGetRequest('getGamesByUserId', { params: { id: userId } }).subscribe(data => {
      this.sourceGame.next(data.games);
    });
  }

  requestGameById(gameId: string) {
    return this.apiService.httpGetRequest(`games/${gameId}`, { }).pipe(map(response => {
      return response.data;
    }));
  }
}
