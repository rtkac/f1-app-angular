import { Action } from '@ngrx/store';

import { User } from 'src/app/models/user.model';

export const SAVE_USER = '[User] Save User';

export class SaveUser implements Action {
  readonly type = SAVE_USER;

  constructor(public payload: User) {}
}

export type UserActions = SaveUser;
