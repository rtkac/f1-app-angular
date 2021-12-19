import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionsSubject } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';

import { Team } from 'src/app/models/teams.model';

import * as UserActions from 'src/app/store/user/user.actions';
import { UserFacade } from 'src/app/store/user/user.facade';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  userStoreSubscription = new Subscription();
  isLoading = false;
  isLoaded = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newFavouriteTeam: Team },
    private userFacade: UserFacade,
    private actionsSubject$: ActionsSubject,
  ) {}

  ngOnInit(): void {
    this.userStoreSubscription = this.userFacade.user$.subscribe((userState) => {
      this.isLoading = userState.isLoading;
      this.isLoaded = userState.isLoaded;
      this.error = '';
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeFavouriteTeam(userId: number) {
    this.userFacade.patchUser({ favouriteTeamId: userId });
    this.dialogRef.disableClose = true;

    this.actionsSubject$.pipe(filter((action) => action.type === UserActions.PATCH_USER_SUCCESS)).subscribe(() => {
      this.dialogRef.close();
    });

    this.actionsSubject$.pipe(filter((action) => action.type === UserActions.PATCH_USER_FAILED)).subscribe(() => {
      this.userStoreSubscription = this.userFacade.user$.subscribe((userState) => {
        this.error = userState.error;
      });
    });
  }

  ngOnDestroy(): void {
    this.userStoreSubscription.unsubscribe();
  }
}
