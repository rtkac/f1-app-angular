import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PatchUserBody, User } from 'src/app/models/user.model';
import * as fromApp from '../../store/app.reducer';
import * as UserActions from './user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$ = this.store.select('user');

  constructor(private store: Store<fromApp.AppState>) {}

  getUser() {
    this.store.dispatch(new UserActions.GetUser());
  }

  getUserSuccess(user: User) {
    this.store.dispatch(new UserActions.GetUserSuccess(user));
  }

  getUserFailed() {
    this.store.dispatch(new UserActions.GetUserFailed());
  }

  patchUser(user: PatchUserBody) {
    this.store.dispatch(new UserActions.PatchUser(user));
  }

  patchUserSuccess(user: User) {
    this.store.dispatch(new UserActions.PatchUserSuccess(user));
  }

  patchUserFailed() {
    this.store.dispatch(new UserActions.PatchUserFailed());
  }
}
