import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Team } from 'src/app/models/teams.model';
import * as fromApp from '../../store/app.reducer';
import * as TeamsActions from './teams.actions';

@Injectable({
  providedIn: 'root',
})
export class TeamsFacade {
  teams$ = this.store.select('teams');

  constructor(private store: Store<fromApp.AppState>) {}

  fetchTeams() {
    this.store.dispatch(new TeamsActions.FetchTeams());
  }

  fetchTeamsSuccess({ teams, favouriteTeam }: { teams: Team[]; favouriteTeam?: Team }) {
    this.store.dispatch(new TeamsActions.FetchTeamsSuccess({ teams, favouriteTeam }));
  }

  fetchTeamsFailed() {
    this.store.dispatch(new TeamsActions.FetchTeamsFailed());
  }

  setFavouriteTeam(favouriteTeam: Team) {
    this.store.dispatch(new TeamsActions.SetFavouriteTeam(favouriteTeam));
  }
}
