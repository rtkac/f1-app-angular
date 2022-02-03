import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, filter, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { Team } from '../../models/teams.model';
import { teamsEndpoint } from 'src/app/config/endopoints';

import * as TeamsActions from './teams.actions';
import { TeamsFacade } from './teams.facade';

@Injectable()
export class TeamsEffects {
  fetchTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeamsActions.FETCH_TEAMS_TRIGGERED),
      withLatestFrom(this.teamsFacade.teams$, (_, teamsStore) => {
        return { teamsStore };
      }),
      filter((_, isLoaded) => {
        return !isLoaded;
      }),
      switchMap(({ teamsStore }) => {
        return this.http.get<Team[]>(teamsEndpoint).pipe(
          map((teamsResponse) => {
            return {
              teams: [...teamsResponse],
              favouriteTeam: teamsResponse.find((team) => team.id === teamsStore.favouriteTeamId),
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

  constructor(private actions$: Actions, private http: HttpClient, private teamsFacade: TeamsFacade) {}
}
