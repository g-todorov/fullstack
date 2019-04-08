import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, NotificationService } from '../../services';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.styl']
})
export class MainNavigationComponent implements OnInit {
  @Input() user: any;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(data => {
      this.notificationService.success(data.message);
      this.router.navigate(['/login']);
    });
  }
}
