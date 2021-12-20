import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Subscription } from 'rxjs';

import { DriverDetail, DriverDetailTeam } from 'src/app/models/drivers.model';
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
  dataSource = new MatTableDataSource<DriverDetailTeam>([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router,
    private driversFacade: DriversFacade,
  ) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

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

            this.dataSource = new MatTableDataSource<DriverDetailTeam>(this.driver?.teams);
          });
        }),
      )
      .subscribe();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  handleTeamClick(teamId: number) {
    this.router.navigate(['teams', teamId]);
  }

  ngOnDestroy(): void {
    this.driversSubscription.unsubscribe();
  }
}
