import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  userStoreSubscription = new Subscription();
  userName = '';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.userStoreSubscription = this.store.select('user').subscribe((userState) => {
      this.userName = userState.user?.firstName || '';
    });
  }

  ngOnDestroy() {
    this.userStoreSubscription.unsubscribe();
  }
}
