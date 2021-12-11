import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { userEndpoint } from 'src/app/config/endopoints';
import { User } from 'src/app/models/user.model';
import * as fromApp from '../../store/app.reducer';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffect {
  putUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.PUT_USER_TRIGGERED),
      switchMap((action: { payload: number }) => {
        return this.http.patch<User>(userEndpoint, {
          favouriteTeamId: action.payload,
        });
      }),
      map((user) => {
        return new UserActions.PutUserSuccess({ user });
      }),
      catchError(() => {
        return of(new UserActions.PutUserFailed());
      }),
    ),
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}
