import { Team } from 'src/app/models/teams.model';
import * as TeamsActions from './teams.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  error: string;
  teams: Team[] | null;
  favouriteTeam?: Team;
}

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  error: '',
  teams: null,
  favouriteTeam: undefined,
};

export function teamsReducer(state = initialState, action: TeamsActions.TeamsActions) {
  switch (action.type) {
    case TeamsActions.FETCH_TEAMS_TRIGGERED:
      return {
        ...state,
        isLoading: true,
      };
    case TeamsActions.FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        teams: [...action.payload.teams],
        favouriteTeam: action.payload.favouriteTeam,
      };
    case TeamsActions.FETCH_TEAMS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Something went wrong during fetching the teams!',
      };
    case TeamsActions.SET_FAVOURITE_TEAM:
      return {
        ...state,
        favouriteTeam: action.payload,
      };
    default:
      return state;
  }
}
