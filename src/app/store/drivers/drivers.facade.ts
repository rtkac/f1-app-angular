import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Driver } from 'src/app/models/drivers.model';
import * as fromApp from '../../store/app.reducer';
import * as DriversActions from './drivers.actions';

@Injectable({
  providedIn: 'root',
})
export class DriversFacade {
  drivers$ = this.store.select('drivers');

  constructor(private store: Store<fromApp.AppState>) {}

  fetchDrivers() {
    this.store.dispatch(new DriversActions.FetchDrivers());
  }

  fetchDriversSuccess(drivers: Driver[]) {
    this.store.dispatch(new DriversActions.FetchDriversSuccess(drivers));
  }

  fetchDriversFailed() {
    this.store.dispatch(new DriversActions.FetchDriversFailed());
  }
}
