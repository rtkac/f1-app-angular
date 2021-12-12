import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from 'src/app/models/user.model';
import * as fromApp from '../../store/app.reducer';
import * as UserActions from './user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$ = this.store.select('user');

  constructor(private store: Store<fromApp.AppState>) {}

  putUser(user: number) {
    this.store.dispatch(new UserActions.PutUser(user));
  }

  putUserSuccess(user: User) {
    this.store.dispatch(new UserActions.PutUserSuccess(user));
  }

  putUserFailed() {
    this.store.dispatch(new UserActions.PutUserFailed());
  }
}
