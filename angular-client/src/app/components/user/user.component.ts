import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService, SessionService } from '../../services';
import { SessionStates } from '../../constants';

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

      const sessionQuery = {
        user: user.id
       };

      this.sessionService.requestSessions(sessionQuery);
      this.sessionService.onSessionUpdated(sessionQuery);
    });

    this.sessionServiceSubscription = this.sessionService.session.subscribe(sessions => {
      if (sessions) {
        this.userSessions = sessions;
      }
    });
  }

  handleSessionClick(event, session) {
    this.sessionService.updateSessionStatus(session._id, session.status);
  }

  getSessionButtonColour(sessionStatus: string) {
    if (sessionStatus === SessionStates.CLOSED) {
      return 'warn';
    }

    return 'primary';
  }
}
