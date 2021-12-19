import { Component, Input } from '@angular/core';

import { Driver } from 'src/app/models/drivers.model';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss'],
})
export class DriverCardComponent {
  @Input() driver?: Driver;
}
