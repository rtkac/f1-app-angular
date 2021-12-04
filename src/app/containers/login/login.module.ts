import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { DashboardGuard } from 'src/app/guards/dashboard.guard';

import { LoginContainer } from './login.container';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginContainer, LoginFormComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginContainer,
        canActivate: [DashboardGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LoginModule {}
