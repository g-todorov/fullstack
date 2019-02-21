import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService, GameService } from '../../services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.styl']
})
export class AdminComponent implements OnInit {
  gameServiceSubscription: Subscription;
  userServiceSubscription: Subscription;
  currentUser: any;

  constructor(
    private gameService: GameService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userServiceSubscription = this.userService.user.subscribe(user => {
      this.currentUser = user;
      this.gameService.requestGames(user.id);
    });

    this.gameServiceSubscription = this.gameService.game.subscribe(games => {
    });
  }

}
