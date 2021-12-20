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
    case UserActions.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: action.payload,
      };
    case UserActions.PATCH_USER_TRIGGERED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };
    case UserActions.PATCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        user: action.payload,
      };
    case UserActions.PATCH_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Something went wrong! Please try again later.',
      };
    default:
      return state;
  }
}
