import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';

import { DashboardContainer } from './dashboard.container';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FavouriteTeamComponent } from './favourite-team/favourite-team.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [DashboardContainer, FavouriteTeamComponent, WelcomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: DashboardContainer, canActivate: [AuthGuard] },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardModule {}
