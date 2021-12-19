import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { InitLoaderComponent } from './components/loaders/init-loader/init-loader.component';
import { InitErrorComponent } from './components/errors/init-error/init-error.component';
import { ModalComponent } from './components/modal/modal.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { DriverCardComponent } from './components/driver-card/driver-card.component';

@NgModule({
  declarations: [InitLoaderComponent, InitErrorComponent, ModalComponent, TeamCardComponent, DriverCardComponent],
  exports: [InitLoaderComponent, InitErrorComponent, ModalComponent, TeamCardComponent, DriverCardComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class SharedModule {}
