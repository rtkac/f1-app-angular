import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../material.module';

import { NotFoundContainer } from './not-found.contaniner';

@NgModule({
  declarations: [NotFoundContainer],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundContainer,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NotFoundModule {}
