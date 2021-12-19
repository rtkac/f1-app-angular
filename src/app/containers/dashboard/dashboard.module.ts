import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';

import { DashboardContainer } from './dashboard.container';
import { AuthGuard } from 'src/app/guards/auth.guard';

@NgModule({
  declarations: [DashboardContainer],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: DashboardContainer, canActivate: [AuthGuard] }]),
  ],
  exports: [RouterModule],
})
export class DashboardModule {}
