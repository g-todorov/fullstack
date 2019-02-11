import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    const routerUrlSubscription = this.userService.user.subscribe(user => {
      debugger
    });
  }

}
