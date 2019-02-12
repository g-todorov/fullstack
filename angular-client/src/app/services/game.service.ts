import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }

  requestGames(userId: string) {
    return this.http.get(`http://localhost:8080/getGamesByUserId`, { params: { id: userId } })
      .pipe(map(games => {
        debugger
      }));
  }
}
