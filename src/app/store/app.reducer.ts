import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './user/user.reducer';
import * as fromTeams from './teams/teams.reducer';
import * as fromDrivers from './drivers/drivers.reducer';

export interface AppState {
  user: fromUser.State;
  teams: fromTeams.State;
  drivers: fromDrivers.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  user: fromUser.userReducer,
  teams: fromTeams.teamsReducer,
  drivers: fromDrivers.driversReducer,
};
