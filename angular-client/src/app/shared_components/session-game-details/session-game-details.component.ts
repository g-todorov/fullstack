import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/app/services';

@Component({
  selector: 'app-session-game-details',
  templateUrl: './session-game-details.component.html',
  styleUrls: ['./session-game-details.component.styl']
})
export class SessionGameDetailsComponent implements OnInit {
  @Input() gameId: string;
  private gameDetails: any = null;

  constructor(
    private gameService: GameService,
  ) { }

  ngOnInit() {
    this.gameService.requestGameById(this.gameId).subscribe(game => {
      this.gameDetails = game;
    });
  }

}
