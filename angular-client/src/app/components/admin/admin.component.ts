import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserService, GameService, QuestionService, SessionService } from '../../services';
import { SessionStates } from '../../constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.styl']
})
export class AdminComponent implements OnInit {
  gameServiceSubscription: Subscription;
  userServiceSubscription: Subscription;
  questionServiceSubscription: Subscription;
  sessionServiceSubscription: Subscription;
  userGames: [any];
  userQuestions: [any];
  userSessions: [any];
  currentUser: any;

  constructor(
    private gameService: GameService,
    private userService: UserService,
    private questionService: QuestionService,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.userServiceSubscription = this.userService.user.subscribe(user => {
      this.currentUser = user;
      this.gameService.requestGames(user.id);
      this.questionService.requestQuestions(user.id);

      const sessionsQuery = {
        createdBy: user.id
      };

      this.sessionService.requestSessions(sessionsQuery);
      this.sessionService.onSessionUpdated(sessionsQuery);
    });

    this.gameServiceSubscription = this.gameService.game.subscribe(games => {
      if (games) {
        this.userGames = games;
      }
    });

    this.questionServiceSubscription = this.questionService.question.subscribe(questions => {
      if (questions) {
        this.userQuestions = questions;
      }
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

  dropGame(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.userGames, event.previousIndex, event.currentIndex);
  }

  dropQuestion(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.userQuestions, event.previousIndex, event.currentIndex);
  }

  getSessionButtonColour(sessionStatus: string) {
    if (sessionStatus === SessionStates.CLOSED) {
      return 'warn';
    }

    return 'primary';
  }
}
