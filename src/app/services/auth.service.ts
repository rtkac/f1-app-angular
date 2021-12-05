import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

import { loginEndpoint } from '../config/endopoints';
import { Authorized, Login } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true);
    }
  }

  login({ email, password }: Login) {
    return this.http.post<any>(loginEndpoint, { email, password }).pipe(
      map((res: Authorized) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.loggedIn.next(true);
      }),
      catchError(this.handleError),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = error.message;
    if (error.status === 401) {
      errorMessage = 'Wrong email or password!';
    }
    return throwError(() => errorMessage);
  }

  get isUserLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get authToken() {
    return localStorage.getItem('token');
  }
}
