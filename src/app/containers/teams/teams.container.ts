import { Component, OnInit } from '@angular/core';

import { TeamsFacade } from 'src/app/store/teams/teams.facade';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.container.html',
})
export class TeamsContainer implements OnInit {
  constructor(private teamsFacade: TeamsFacade) {}

  ngOnInit(): void {
    this.teamsFacade.fetchTeams();
  }
}
