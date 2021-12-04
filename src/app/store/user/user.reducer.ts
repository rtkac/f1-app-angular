import { User } from 'src/app/models/user.model';
import * as UserActions from './user.actions';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export function userReducer(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
