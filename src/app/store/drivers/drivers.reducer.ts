import { Driver } from 'src/app/models/drivers.model';
import * as DriversActions from './drivers.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  error: string;
  drivers: Driver[] | null;
}

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  error: '',
  drivers: null,
};

export function driversReducer(state = initialState, action: DriversActions.DriversActions) {
  switch (action.type) {
    case DriversActions.FETCH_DRIVERS_TRIGGERED:
      return {
        ...state,
        isLoading: true,
      };
    case DriversActions.FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        drivers: action.payload,
      };
    case DriversActions.FETCH_DRIVERS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Something went wrong during fetching the drivers!',
      };
    default:
      return state;
  }
}
