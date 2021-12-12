import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { userEndpoint } from 'src/app/config/endopoints';
import { User } from 'src/app/models/user.model';
import * as UserActions from './user.actions';
import { UserFacade } from './user.facade';

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
        return new UserActions.PutUserSuccess(user);
      }),
      catchError((_, caught) => {
        this.userFacade.putUserFailed();
        return caught;
      }),
    ),
  );

  constructor(private actions$: Actions, private http: HttpClient, private userFacade: UserFacade) {}
}
