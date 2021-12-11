import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Team } from 'src/app/models/teams.model';
import * as fromApp from '../../../store/app.reducer';

import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['logo', 'name', 'president', 'director', 'actions'];
  isLoading = false;
  isLoaded = false;
  error!: string;
  teams: Team[] | null = null;
  favouriteTeamId?: number;
  teamsStoreSubscription = new Subscription();
  canChangeIcon = { show: false, id: 0 };

  constructor(private router: Router, private store: Store<fromApp.AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.teamsStoreSubscription = this.store.select('teams').subscribe((response) => {
      this.isLoading = response.isLoading;
      this.isLoaded = response.isLoaded;
      this.error = response.error;
      this.teams = response.teams;
      this.favouriteTeamId = response.favouriteTeam?.id;
    });
  }

  handleRowClick(item: Team): void {
    this.router.navigate(['teams', item.id]);
  }

  setAsFavourite(e: Event, id: number) {
    e.stopPropagation();

    const newFavouriteTeam = this.teams?.find((team) => team.id === id);
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

  ngOnDestroy(): void {
    this.teamsStoreSubscription.unsubscribe();
  }
}
