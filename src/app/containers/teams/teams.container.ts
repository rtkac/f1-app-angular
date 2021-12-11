import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as TeamsActions from 'src/app/store/teams/teams.actions';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.container.html',
})
export class TeamsContainer implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new TeamsActions.FetchTeams());
  }
}
