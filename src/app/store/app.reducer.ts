import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './user/user.reducer';

export interface AppState {
  user: fromUser.State;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  user: fromUser.userReducer,
};
