import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';

import { driverEndpoint, driversEndpoint } from 'src/app/config/endopoints';
import { DriverDetailResponse, DriversResponse } from 'src/app/models/drivers.model';

import * as fromDrivers from './drivers.reducer';
import * as DriversActions from './drivers.actions';
import { DriversFacade } from './drivers.facade';

@Injectable()
export class DriversEffects {
  fetchDrivers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActions.FETCH_DRIVERS_TRIGGERED),
      withLatestFrom(this.driversFacade.drivers$, (_, driversStore) => {
        return { driversStore };
      }),
      filter((_, isLoaded) => {
        return !isLoaded;
      }),
      switchMap(() => {
        return this.http.get<DriversResponse>(driversEndpoint).pipe(
          map((driversResponse) => {
            return new DriversActions.FetchDriversSuccess(driversResponse.response);
          }),
          catchError(() => {
            return of(new DriversActions.FetchDriversFailed());
          }),
        );
      }),
    ),
  );
  fetchDriver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DriversActions.FETCH_DRIVER_TRIGGERED),
      withLatestFrom(
        this.driversFacade.drivers$,
        (action: DriversActions.FetchDriver, driversStore: fromDrivers.State) => {
          return {
            action,
            driversStore,
          };
        },
      ),
      switchMap(({ action, driversStore }) => {
        if (driversStore.driversDetail.find((driver) => driver.id === action.payload)) {
          return [new DriversActions.FetchDriverSuccess([])];
        }
        return this.http.get<DriverDetailResponse>(driverEndpoint(action.payload)).pipe(
          map((driverResponse) => {
            return new DriversActions.FetchDriverSuccess(driverResponse.response);
          }),
          catchError(() => {
            return of(new DriversActions.FetchDriverFailed());
          }),
        );
      }),
    ),
  );

  constructor(private actions$: Actions, private http: HttpClient, private driversFacade: DriversFacade) {}
}
