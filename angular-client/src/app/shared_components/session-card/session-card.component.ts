import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services';

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
    // this.sessionService.requestSession(this.sessionId);
  }

}
