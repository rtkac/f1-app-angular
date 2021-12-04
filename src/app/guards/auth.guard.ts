import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((obs) => {
      this.authService.isUserLoggedIn.subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['login']);
          return obs.next(false);
        }
        return obs.next(true);
      });
    });
  }
}
