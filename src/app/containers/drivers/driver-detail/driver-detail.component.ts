import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';

import { DriverDetail } from 'src/app/models/drivers.model';
import { DriversFacade } from 'src/app/store/drivers/drivers.facade';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.scss'],
})
export class DriverDetailComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoaded = false;
  error!: string;
  driver?: DriverDetail;
  driversSubscription = new Subscription();
  displayedColumns: string[] = ['season', 'team'];

  constructor(private route: ActivatedRoute, private router: Router, private driversFacade: DriversFacade) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => {
          const id = +params['id'];

          this.driversFacade.fetchDriver(id);

          this.driversSubscription = this.driversFacade.drivers$.subscribe((response) => {
            this.isLoading = response.isLoadingDetail;
            this.isLoaded = response.isLoadedDetail;
            this.error = response.errorDetail;
            this.driver = response.driversDetail.find((driver) => driver.id === id);
          });
        }),
      )
      .subscribe();
  }

  handleTeamClick(teamId: number) {
    this.router.navigate(['teams', teamId]);
  }

  ngOnDestroy(): void {
    this.driversSubscription.unsubscribe();
  }
}
