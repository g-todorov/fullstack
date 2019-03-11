import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, LoginComponent, RegisterComponent, AlertComponent, AdminComponent } from './components';

import { CookieInterceptor } from './interceptors/cookie.interceptor';
import { CookieService } from 'ngx-cookie-service';

import { AlertDirective } from './directives';

import { MaterialModule } from './modules';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// TODO: This should be extracted in separate module
// const config: SocketIoConfig = { url: 'http://localhost:8080/', options: {
//   query: 'test=test'
// } };

@NgModule({
  declarations: [
    AlertComponent,
    AlertDirective,
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    // SocketIoModule.forRoot(config)
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
