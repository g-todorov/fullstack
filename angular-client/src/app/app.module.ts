import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  AlertComponent,
  AdminComponent,
  UserComponent,
} from './components';
import { SessionCardComponent } from './shared_components/session-card/session-card.component';
import { SessionUserDetailsComponent } from './shared_components/session-user-details/session-user-details.component';

import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { CookieService } from 'ngx-cookie-service';

import { AlertDirective } from './directives';
import { MaterialModule } from './modules';

@NgModule({
  declarations: [
    AdminComponent,
    AlertComponent,
    AlertDirective,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SessionCardComponent,
    SessionUserDetailsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
