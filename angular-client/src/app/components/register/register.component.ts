import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  getEmailErrorMessage() {
    const emailInput = this.registerForm.controls.email;

    return emailInput.hasError('required') ? 'You must enter a value' :
      emailInput.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.notificationService.success(data.message, true);
          this.router.navigate(['/login']);
        },
        error => {
          this.notificationService.error(error.error.message);
          this.loading = false;
        });
  }
}
