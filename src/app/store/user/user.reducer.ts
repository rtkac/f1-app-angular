import { User } from 'src/app/models/user.model';
import * as UserActions from './user.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  error: string;
  user: User | null;
}

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  error: '',
  user: null,
};

export function userReducer(state = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    case UserActions.PUT_USER_TRIGGERED:
      return {
        ...state,
        isLoading: true,
      };
    case UserActions.PUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: action.payload.user,
      };
    case UserActions.PUT_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: 'Something went wrong during changing your favourite team!',
      };
    default:
      return state;
  }
}
