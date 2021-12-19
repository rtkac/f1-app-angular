import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundLayoutComponent } from './layouts/not-found-layout/not-found-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./containers/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'teams',
        loadChildren: () => import('./containers/teams/teams.module').then((m) => m.TeamsModule),
      },
      {
        path: 'drivers',
        loadChildren: () => import('./containers/drivers/drivers.module').then((m) => m.DriversModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./containers/profile/profile.module').then((m) => m.ProfileModule),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./containers/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  {
    path: '',
    component: NotFoundLayoutComponent,
    children: [
      {
        path: '**',
        loadChildren: () => import('./containers/not-found/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
