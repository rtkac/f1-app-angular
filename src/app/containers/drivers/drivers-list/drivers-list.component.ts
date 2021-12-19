import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Driver } from 'src/app/models/drivers.model';
import { DriversFacade } from 'src/app/store/drivers/drivers.facade';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
})
export class DriversListComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoaded = false;
  error!: string;
  drivers: Driver[] | null = null;
  driversSubscription = new Subscription();

  constructor(private driversFacade: DriversFacade) {}

  ngOnInit(): void {
    this.driversFacade.fetchDrivers();
    this.driversSubscription = this.driversFacade.drivers$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.isLoaded = response.isLoaded;
      this.error = response.error;
      this.drivers = response.drivers;
    });
  }

  ngOnDestroy(): void {
    this.driversSubscription.unsubscribe();
  }
}
