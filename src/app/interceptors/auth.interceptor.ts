import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestUrl = request.url;
    const token = this.authService.authToken;

    if (token) {
      if (requestUrl.indexOf(environment.API_URL) !== -1) {
        const authRequest = request.clone({
          headers: request.headers.set('Authorization', token),
        });
        return next.handle(authRequest);
      } else {
        const sportsApiRequest = request.clone({
          headers: request.headers.set('x-apisports-key', environment.APISPORTS_KEY),
        });
        return next.handle(sportsApiRequest);
      }
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return throwError(() => error);
      }),
    );
  }
}
