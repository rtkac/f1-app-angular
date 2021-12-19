import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import * as UserActions from 'src/app/store/user/user.actions';
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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private userFacade: UserFacade,
    private actionsSubject$: ActionsSubject,
  ) {}

  ngOnInit(): void {
    this.loggedInSubscription = this.authService.isUserLoggedIn.subscribe((loggedIn) => {
      this.isInitLoading = true;
      if (loggedIn) {
        this.userFacade.getUser();

        this.actionsSubject$.pipe(filter((action) => action.type === UserActions.GET_USER_SUCCESS)).subscribe(() => {
          this.isInitLoading = false;
        });

        this.actionsSubject$.pipe(filter((action) => action.type === UserActions.GET_USER_FAILED)).subscribe(() => {
          this.isInitLoading = false;
          this.isInitError = true;
        });
      } else {
        this.isInitLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
}
