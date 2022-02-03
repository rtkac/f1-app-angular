import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { Team } from 'src/app/models/teams.model';
import { TeamsFacade } from 'src/app/store/teams/teams.facade';

import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['logo', 'name', 'base', 'teamChief', 'actions'];
  isLoading = false;
  isLoaded = false;
  error!: string;
  favouriteTeamId?: number;
  teamsStoreSubscription = new Subscription();
  userStoreSubscription = new Subscription();
  canChangeIcon = { show: false, id: 0 };
  dataSource = new MatTableDataSource<Team>([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private teamsFacade: TeamsFacade,
    private dialog: MatDialog,
  ) {}

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.teamsStoreSubscription = this.teamsFacade.teams$.subscribe((response) => {
      this.isLoading = response.isLoading;
      this.isLoaded = response.isLoaded;
      this.error = response.error;
      this.favouriteTeamId = response.favouriteTeam?.id;

      this.dataSource = new MatTableDataSource<Team>(response.teams || undefined);
      this.dataSource.sort = this.sort;
    });
  }

  handleRowClick(item: Team): void {
    this.router.navigate(['teams', item.id]);
  }

  setAsFavourite(e: Event, id: number) {
    e.stopPropagation();

    const newFavouriteTeam = this.dataSource.data?.find((team) => team.id === id);
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { newFavouriteTeam },
    });

    dialogRef.afterClosed();
  }

  changeIcon(show: boolean, id: number): void {
    this.canChangeIcon = {
      show,
      id,
    };
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnDestroy(): void {
    this.teamsStoreSubscription.unsubscribe();
    this.userStoreSubscription.unsubscribe();
  }
}
