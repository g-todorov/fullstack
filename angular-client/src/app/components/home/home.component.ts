import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService, GameService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: any;
  currentUserGames: any[] = null;
  userServiceSubscription: Subscription;
  gameServiceSubscription: Subscription;

  constructor(
    private userService: UserService,
    private gameService: GameService,
  ) { }

  ngOnInit() {
    this.userServiceSubscription = this.userService.user.subscribe(user => {
      this.currentUser = user;
      // this.gameService.requestGames(user.id);
    });

  }

  ngOnDestroy() {
    // this.userServiceSubscription.unsubscribe();
    this.currentUser = null;
    this.currentUserGames = null;
  }

}
