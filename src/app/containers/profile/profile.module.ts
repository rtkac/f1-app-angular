import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { SharedModule } from 'src/app/shared.module';

import { ProfileContainer } from './profile.container';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@NgModule({
  declarations: [ProfileContainer, ProfileFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileContainer,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ProfileFormComponent,
          },
        ],
      },
    ]),
  ],
})
export class ProfileModule {}
