import { Directive, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { NotificationService } from '../services';

@Directive({
  selector: '[appNotification]'
})
export class NotificationDirective implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private notificationService: NotificationService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.notificationService.getMessage().subscribe(message => {
      this.message = message;
      let snackBarClass = '';

      if (message) {
        if (message.type === 'error') {
          snackBarClass =  'error-text';
        }
        this.openSnackBar(message.text, 'close', snackBarClass);
      }
    });
  }

  openSnackBar(message: string, action: string, snackBarClass: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: snackBarClass,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
