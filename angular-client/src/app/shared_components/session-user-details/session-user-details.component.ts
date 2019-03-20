import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services';


@Component({
  selector: 'app-session-user-details',
  templateUrl: './session-user-details.component.html',
  styleUrls: ['./session-user-details.component.styl']
})
export class SessionUserDetailsComponent implements OnInit {
  @Input() userId: string;
  private userDetails: any = null;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.requestUserById(this.userId).subscribe(user => {
      this.userDetails = user;
    });
  }
}
