import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services';

import { SessionStates } from '../../constants';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.styl']
})
export class SessionCardComponent implements OnInit {
  @Input() session: any;


  constructor(
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
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
