import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserFacade } from 'src/app/store/user/user.facade';

import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  userStoreSubscription = new Subscription();
  userName = '';

  constructor(private store: Store<fromApp.AppState>, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userStoreSubscription = this.userFacade.user$.subscribe((userState) => {
      this.userName = userState.user?.firstName || '';
    });
  }

  ngOnDestroy() {
    this.userStoreSubscription.unsubscribe();
  }
}
