import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { userEndpoint } from 'src/app/config/endopoints';
import { PatchUserBody, User } from 'src/app/models/user.model';
import { TeamsFacade } from '../teams/teams.facade';
import * as UserActions from './user.actions';
import { UserFacade } from './user.facade';

@Injectable()
export class UserEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GET_USER_TRIGGERED),
      switchMap(() => {
        return this.http.get<User>(userEndpoint);
      }),
      map((user) => {
        this.teamsFacade.setFavouriteTeamId(user.favouriteTeamId);
        return new UserActions.GetUserSuccess(user);
      }),
      catchError((_, caught) => {
        this.userFacade.getUserFailed();
        return caught;
      }),
    ),
  );
  patchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.PATCH_USER_TRIGGERED),
      switchMap((action: { payload: PatchUserBody }) => {
        return this.http.patch<User>(userEndpoint, {
          ...action.payload,
        });
      }),
      map((user) => {
        this.teamsFacade.setFavouriteTeam(user.favouriteTeamId);
        return new UserActions.PatchUserSuccess(user);
      }),
      catchError((_, caught) => {
        this.userFacade.patchUserFailed();
        return caught;
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private userFacade: UserFacade,
    private teamsFacade: TeamsFacade,
  ) {}
}
