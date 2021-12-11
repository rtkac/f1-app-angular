import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { TeamsContainer } from './teams.container';
import { TeamsListComponent } from './teams-list/teams-list.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

@NgModule({
  declarations: [TeamsContainer, TeamsListComponent, TeamDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeamsContainer,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: TeamsListComponent,
            data: {
              label: 'TESUJEEEM',
            },
          },
          {
            path: ':id',
            component: TeamDetailComponent,
            data: {
              label: 'TESUJEEEM-DETAIL',
            },
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class TeamsModule {}
