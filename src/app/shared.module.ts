import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { InitLoaderComponent } from './components/loaders/init-loader/init-loader.component';
import { InitErrorComponent } from './components/errors/init-error/init-error.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [InitLoaderComponent, InitErrorComponent, ModalComponent],
  exports: [InitLoaderComponent, InitErrorComponent, ModalComponent],
  imports: [MaterialModule],
})
export class SharedModule {}
