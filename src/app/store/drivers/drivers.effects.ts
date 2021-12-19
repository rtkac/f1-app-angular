import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';

import { driversEndpoint } from 'src/app/config/endopoints';
import { DriversResponse } from 'src/app/models/drivers.model';
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
          catchError((_, caught) => {
            this.driversFacade.fetchDriversFailed();
            return caught;
          }),
        );
      }),
    ),
  );

  constructor(private actions$: Actions, private http: HttpClient, private driversFacade: DriversFacade) {}
}
