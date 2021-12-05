import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isUserLoggedIn.pipe(
      take(1),
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }),
    );
  }
}
