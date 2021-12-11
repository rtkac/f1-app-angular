import { Component, Input } from '@angular/core';
import { Team } from 'src/app/models/teams.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input() team?: Team;
}
