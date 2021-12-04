import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import * as fromApp from './store/app.reducer';
import * as UserActions from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isInitLoading = true;
  isInitError = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe((loggedIn) => {
      this.isInitLoading = true;
      if (loggedIn) {
        this.userService.getUser().subscribe(
          (user) => {
            if (user) {
              this.isInitLoading = false;
              this.store.dispatch(new UserActions.SaveUser(user));
            }
          },
          () => {
            this.isInitError = true;
          }
        );
      } else {
        this.isInitLoading = false;
      }
    });
  }
}
