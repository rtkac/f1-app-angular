import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './user/user.reducer';
import * as fromTeams from './teams/teams.reducer';

export interface AppState {
  user: fromUser.State;
  teams: fromTeams.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  user: fromUser.userReducer,
  teams: fromTeams.teamsReducer,
};
