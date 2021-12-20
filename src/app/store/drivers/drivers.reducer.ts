import { Driver, DriverDetail } from 'src/app/models/drivers.model';
import * as DriversActions from './drivers.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  error: string;
  drivers: Driver[];
  driversDetail: DriverDetail[];
  isLoadingDetail: boolean;
  isLoadedDetail: boolean;
  errorDetail: string;
}

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  error: '',
  drivers: [],
  driversDetail: [],
  isLoadingDetail: false,
  isLoadedDetail: false,
  errorDetail: '',
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
    case DriversActions.FETCH_DRIVER_TRIGGERED: {
      return {
        ...state,
        isLoadingDetail: true,
        errorDetail: '',
      };
    }
    case DriversActions.FETCH_DRIVER_SUCCESS:
      return {
        ...state,
        isLoadingDetail: false,
        isLoadedDetail: true,
        driversDetail: [...state.driversDetail, ...action.payload],
      };
    case DriversActions.FETCH_DRIVER_FAILED:
      return {
        ...state,
        isLoadingDetail: false,
        isLoadedDetail: false,
        errorDetail: 'Something went wrong during fetching the driver detail!',
      };
    default:
      return state;
  }
}
