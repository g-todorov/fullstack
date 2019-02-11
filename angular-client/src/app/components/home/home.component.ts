import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  currentUser: object = null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    const routerUrlSubscription = this.userService.user.subscribe(user => {
      this.currentUser = user;
    });
  }

}
