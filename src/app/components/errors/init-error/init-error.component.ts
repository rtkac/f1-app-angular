import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-init-error',
  templateUrl: './init-error.component.html',
  styleUrls: ['./init-error.component.scss'],
})
export class InitErrorComponent {
  @Input() errorMessage!: string;
}
