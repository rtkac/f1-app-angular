import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  userName = '';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('user').subscribe((userState) => {
      this.userName = userState.user?.firstName || '';
    });
  }
}
