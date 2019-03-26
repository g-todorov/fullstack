import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, SessionService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.styl']
})
export class SessionComponent implements OnInit {
  private sessionId: string;
  private currentSession: any;
  private currentUser: any;
  private userServiceSubscription: Subscription;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.userServiceSubscription = this.userService.user.subscribe(user => {
      this.currentUser = user;

      this.sessionService.requestSessionById(this.sessionId).subscribe(session => {
        this.currentSession = session;
      } );
    });
  }

}
