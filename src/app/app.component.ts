import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { UserFacade } from './store/user/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loggedInSubscription = new Subscription();
  isInitLoading = true;
  isInitError = false;

  constructor(private authService: AuthService, private userService: UserService, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isUserLoggedIn.subscribe((loggedIn) => {
      this.isInitLoading = true;
      if (loggedIn) {
        this.userService.getUser().subscribe(
          (user) => {
            if (user) {
              this.isInitLoading = false;
              this.userFacade.putUserSuccess(user);
            }
          },
          () => {
            this.isInitLoading = false;
            this.isInitError = true;
          },
        );
      } else {
        this.isInitLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
}
