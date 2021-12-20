import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { DriversContainer } from './drivers.container';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';

@NgModule({
  declarations: [DriversContainer, DriversListComponent, DriverDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: DriversContainer,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: DriversListComponent,
          },
          {
            path: ':id',
            component: DriverDetailComponent,
          },
        ],
      },
    ]),
  ],
})
export class DriversModule {}
