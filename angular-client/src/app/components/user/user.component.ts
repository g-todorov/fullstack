import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, SessionService } from '../../services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl']
})
export class UserComponent implements OnInit {
  currentUser: any;
  userServiceSubscription: Subscription;
  sessionServiceSubscription: Subscription;
  userSessions: [any];

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.userServiceSubscription = this.userService.user.subscribe(user => {
      this.currentUser = user;
      this.sessionService.requestSessions(user.id);
    });

    this.sessionServiceSubscription = this.sessionService.session.subscribe(sessions => {
      if (sessions) {
        this.userSessions = sessions;
      }
    });
  }
}
