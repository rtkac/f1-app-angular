import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Team } from 'src/app/models/teams.model';
import { TeamsFacade } from 'src/app/store/teams/teams.facade';

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

  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {
    this.teamsFacade.fetchTeams();
    this.teamsStoreSubscription = this.teamsFacade.teams$.subscribe((response) => {
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
