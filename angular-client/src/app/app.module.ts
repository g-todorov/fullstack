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
  AdminComponent,
  UserComponent,
  MainNavigationComponent,
  SessionComponent,
} from './components';
import { SessionCardComponent } from './shared_components/session-card/session-card.component';
import { SessionUserDetailsComponent } from './shared_components/session-user-details/session-user-details.component';
import { SessionGameDetailsComponent } from './shared_components/session-game-details/session-game-details.component';

import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-errors.interceptor';
import { CookieService } from 'ngx-cookie-service';

import { NotificationDirective } from './directives';
import { MaterialModule } from './modules';

@NgModule({
  declarations: [
    AdminComponent,
    NotificationDirective,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SessionCardComponent,
    SessionUserDetailsComponent,
    SessionGameDetailsComponent,
    SessionComponent,
    MainNavigationComponent,
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
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
