import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, filter, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TeamsResponse } from '../../models/teams.model';
import { teamsEndpoint } from 'src/app/config/endopoints';

import * as TeamsActions from './teams.actions';
import { TeamsFacade } from './teams.facade';
import { UserFacade } from '../user/user.facade';

@Injectable()
export class TeamsEffects {
  fetchTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.FETCH_TEAMS_TRIGGERED),
      withLatestFrom(this.teamsFacade.teams$, this.userFacade.user$, (_, teams, userStore) => {
        return { userStore };
      }),
      filter((_, isLoaded) => {
        return !isLoaded;
      }),
      switchMap(({ userStore }) => {
        return this.http.get<TeamsResponse>(teamsEndpoint).pipe(
          map((teamsResponse) => {
            return {
              teams: [...teamsResponse.response],
              favouriteTeam: teamsResponse.response.find((team) => team.id === userStore.user?.favouriteTeamId),
            };
          }),
          map((teamsFormatted) => {
            return new TeamsActions.FetchTeamsSuccess(teamsFormatted);
          }),
          catchError(() => {
            return of(new TeamsActions.FetchTeamsFailed());
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private teamsFacade: TeamsFacade,
    private userFacade: UserFacade,
  ) {}
}
