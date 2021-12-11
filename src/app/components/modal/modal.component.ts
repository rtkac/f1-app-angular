import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Team } from 'src/app/models/teams.model';

import * as UserActions from 'src/app/store/user/user.actions';
import * as TeamsActions from '../../store/teams/teams.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newFavouriteTeam: Team },
    private store: Store<fromApp.AppState>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeFavouriteTeam(userId: number) {
    this.store.dispatch(new TeamsActions.SetFavouriteTeam({ favouriteTeam: this.data.newFavouriteTeam }));
    this.store.dispatch(new UserActions.PutUser(userId));
    this.dialogRef.close();
  }
}
