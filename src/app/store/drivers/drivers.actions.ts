import { Action } from '@ngrx/store';

import { Driver } from 'src/app/models/drivers.model';

export const FETCH_DRIVERS_TRIGGERED = '[Drivers] Fetch Drivers Triggered';
export const FETCH_DRIVERS_SUCCESS = '[Drivers] Fetch Drivers Success';
export const FETCH_DRIVERS_FAILED = '[Drivers] Fetch Drivers Failed';

export class FetchDrivers implements Action {
  readonly type = FETCH_DRIVERS_TRIGGERED;
}

export class FetchDriversSuccess implements Action {
  readonly type = FETCH_DRIVERS_SUCCESS;

  constructor(public payload: Driver[]) {}
}

export class FetchDriversFailed implements Action {
  readonly type = FETCH_DRIVERS_FAILED;
}

export type DriversActions = FetchDrivers | FetchDriversSuccess | FetchDriversFailed;
