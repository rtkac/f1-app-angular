import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { TeamsContainer } from './teams.container';

@NgModule({
  declarations: [TeamsContainer],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeamsContainer,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class TeamsModule {}
