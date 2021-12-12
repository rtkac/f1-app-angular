import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';

import { Team } from 'src/app/models/teams.model';
import { TeamsFacade } from 'src/app/store/teams/teams.facade';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
  id?: number;
  isLoading = false;
  isLoaded = false;
  error!: string;
  team?: Team;
  isFavourite = false;
  teamStoreSubscription = new Subscription();

  constructor(private route: ActivatedRoute, private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.id = id;
          return this.teamsFacade.teams$;
        }),
        map((teamsState) => {
          this.isLoading = teamsState.isLoading;
          this.isLoaded = teamsState.isLoaded;
          this.error = teamsState.error;
          return {
            team: teamsState.teams?.find((team) => {
              return team.id === this.id;
            }),
            isFavourite: teamsState.favouriteTeam?.id === this.id,
          };
        }),
      )
      .subscribe((teamRes) => {
        this.team = teamRes.team;
        this.isFavourite = teamRes.isFavourite;
      });
  }

  ngOnDestroy(): void {
    this.teamStoreSubscription.unsubscribe();
  }
}
