import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { loginEndpoint } from '../config/endopoints';
import { Authorized, Login } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('token')) {
      this.loggedIn.next(true);
    }
  }

  login({ email, password }: Login): void {
    this.http.post<any>(loginEndpoint, { email, password }).subscribe({
      next: (res: Authorized) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        this.loggedIn.next(true);
      },
      error: (err) => console.log(err),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  get isUserLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get authToken() {
    return localStorage.getItem('token');
  }
}
