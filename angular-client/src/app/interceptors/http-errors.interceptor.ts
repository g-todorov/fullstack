import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../services';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {}, (error: any) => {
        if (error instanceof HttpErrorResponse && error.url !== `${environment.apiUrl}/users/me`) {
          this.notificationService.error(error.error ? error.error.message : error.message);
        }
      })
    );
  }
}
