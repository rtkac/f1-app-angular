import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { isEqual } from 'lodash';

import { User } from 'src/app/models/user.model';
import { Team } from 'src/app/models/teams.model';

import * as UserActions from 'src/app/store/user/user.actions';
import { UserFacade } from 'src/app/store/user/user.facade';
import { TeamsFacade } from 'src/app/store/teams/teams.facade';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  profileEditForm!: FormGroup;
  userStoreSubscription = new Subscription();
  teamsStoreSubscription = new Subscription();
  user: User | null = null;
  userLoading = false;
  teams: Team[] | null = null;
  favouriteTeamId?: number;
  teamsLoading = false;
  teamsLoaded = false;
  teamsError = '';
  editMode = false;
  errorMessage = '';

  constructor(
    private actionsSubject$: ActionsSubject,
    private userFacade: UserFacade,
    private teamsFacade: TeamsFacade,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.teamsFacade.fetchTeams();
    this.userStoreSubscription = this.userFacade.user$.subscribe((userState) => {
      this.user = userState.user;
      this.userLoading = userState.isLoading;
      this.errorMessage = userState.error;
    });
    this.teamsStoreSubscription = this.teamsFacade.teams$.subscribe((teamsState) => {
      this.teams = teamsState.teams;
      this.favouriteTeamId = teamsState.favouriteTeam?.id;
      this.teamsLoading = teamsState.isLoading;
      this.teamsLoaded = teamsState.isLoaded;
      this.teamsError = teamsState.error;
    });

    this.profileEditForm.patchValue({
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      email: this.user?.email,
      favouriteTeamId: this.user?.favouriteTeamId,
    });

    Object.keys(this.profileEditForm.controls).forEach((controlName) => {
      this.profileEditForm.controls[controlName]['disable']();
    });

    this.profileEditForm.valueChanges.subscribe(() => (this.errorMessage = ''));

    this.actionsSubject$.pipe(filter((action) => action.type === UserActions.PATCH_USER_SUCCESS)).subscribe(() => {
      this.toggleEdit();
    });
  }

  toggleEdit(closeForm?: boolean): void {
    this.editMode = !this.editMode;

    Object.keys(this.profileEditForm.controls).forEach((controlName) => {
      this.profileEditForm.controls[controlName][this.editMode ? 'enable' : 'disable']();
    });

    if (closeForm) {
      this.profileEditForm.reset({
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        favouriteTeamId: this.user?.favouriteTeamId,
      });
    }
  }

  private initForm(): void {
    this.profileEditForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      favouriteTeamId: new FormControl(null, Validators.required),
    });
  }

  submitForm(): void {
    const isFormChanged = !isEqual(this.profileEditForm.value, this.user);

    if (!isFormChanged) {
      this.errorMessage = 'Please change at least one field before submit!';
    } else {
      if (this.profileEditForm.valid) {
        this.userFacade.patchUser(this.profileEditForm.value);
      }
    }
  }

  ngOnDestroy(): void {
    this.userStoreSubscription.unsubscribe();
    this.teamsStoreSubscription.unsubscribe();
  }
}
