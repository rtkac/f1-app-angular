import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Team } from 'src/app/models/teams.model';
import * as fromApp from '../../store/app.reducer';
import * as TeamsActions from '../../store/teams/teams.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.scss'],
})
export class DashboardContainer implements OnInit, OnDestroy {
  isLoading = false;
  isLoaded = false;
  error!: string;
  favouriteTeam?: Team;
  teamsStoreSubscription = new Subscription();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new TeamsActions.FetchTeams());
    this.teamsStoreSubscription = this.store.select('teams').subscribe((response) => {
      this.isLoading = response.isLoading;
      this.isLoaded = response.isLoaded;
      this.error = response.error;
      this.favouriteTeam = response.favouriteTeam;
    });
  }

  ngOnDestroy(): void {
    this.teamsStoreSubscription.unsubscribe();
  }
}
