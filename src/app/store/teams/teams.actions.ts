import { Action } from '@ngrx/store';

import { Team } from 'src/app/models/teams.model';

export const FETCH_TEAMS_TRIGGERED = '[Teams] Fetch Teams Triggered';
export const FETCH_TEAMS_SUCCESS = '[Teams] Fetch Teams Success';
export const FETCH_TEAMS_FAILED = '[Teams] Fetch Teams Failed';
export const SET_FAVOURITE_TEAM = '[Teams] Set Favourite Team';
export const SET_FAVOURITE_TEAM_ID = '[Teams] Set Favourite Team ID';

export class FetchTeams implements Action {
  readonly type = FETCH_TEAMS_TRIGGERED;
}

export class FetchTeamsSuccess implements Action {
  readonly type = FETCH_TEAMS_SUCCESS;

  constructor(public payload: { teams: Team[]; favouriteTeam?: Team }) {}
}

export class FetchTeamsFailed implements Action {
  readonly type = FETCH_TEAMS_FAILED;
}

export class SetFavouriteTeamId implements Action {
  readonly type = SET_FAVOURITE_TEAM_ID;

  constructor(public payload: number) {}
}

export class SetFavouriteTeam implements Action {
  readonly type = SET_FAVOURITE_TEAM;

  constructor(public payload: number) {}
}

export type TeamsActions = FetchTeams | FetchTeamsSuccess | FetchTeamsFailed | SetFavouriteTeamId | SetFavouriteTeam;
