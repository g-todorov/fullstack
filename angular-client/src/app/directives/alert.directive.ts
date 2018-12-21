import { Directive, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { AlertService } from '../services/alert.service';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;

      if (message) {
        this.openSnackBar(message.text, 'close');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
