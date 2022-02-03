import { Action } from '@ngrx/store';

import { Driver, DriverDetail } from 'src/app/models/drivers.model';

export const FETCH_DRIVERS_TRIGGERED = '[Drivers] Fetch Drivers Triggered';
export const FETCH_DRIVERS_SUCCESS = '[Drivers] Fetch Drivers Success';
export const FETCH_DRIVERS_FAILED = '[Drivers] Fetch Drivers Failed';

export const FETCH_DRIVER_TRIGGERED = '[Drivers] Fetch Driver Triggered';
export const FETCH_DRIVER_SUCCESS = '[Drivers] Fetch Driver Success';
export const FETCH_DRIVER_FAILED = '[Drivers] Fetch Driver Failed';

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

export class FetchDriver implements Action {
  readonly type = FETCH_DRIVER_TRIGGERED;

  constructor(public payload: number) {}
}

export class FetchDriverSuccess implements Action {
  readonly type = FETCH_DRIVER_SUCCESS;

  constructor(public payload: DriverDetail | null) {}
}

export class FetchDriverFailed implements Action {
  readonly type = FETCH_DRIVER_FAILED;
}

export type DriversActions =
  | FetchDrivers
  | FetchDriversSuccess
  | FetchDriversFailed
  | FetchDriver
  | FetchDriverSuccess
  | FetchDriverFailed;
