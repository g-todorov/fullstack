import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserService, GameService, QuestionService } from '../../services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.styl']
})
export class AdminComponent implements OnInit {
  gameServiceSubscription: Subscription;
  userServiceSubscription: Subscription;
  questionServiceSubscription: Subscription;
  userGames: [any];
  userQuestions: [any];
  currentUser: any;

  constructor(
    private gameService: GameService,
    private userService: UserService,
    private questionService: QuestionService,
  ) { }

  ngOnInit() {
    this.userServiceSubscription = this.userService.user.subscribe(user => {
      this.currentUser = user;
      this.gameService.requestGames(user.id);
      this.questionService.requestQuestions(user.id);
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
  }

  dropGame(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.userGames, event.previousIndex, event.currentIndex);
  }

  dropQuestion(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.userQuestions, event.previousIndex, event.currentIndex);
  }
}
