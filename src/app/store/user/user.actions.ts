import { Action } from '@ngrx/store';

import { User } from 'src/app/models/user.model';

export const PUT_USER_TRIGGERED = '[User] Put User Triggered';
export const PUT_USER_SUCCESS = '[User] Put User Success';
export const PUT_USER_FAILED = '[User] Put User Failed';

export class PutUser implements Action {
  readonly type = PUT_USER_TRIGGERED;

  constructor(public payload: number) {}
}

export class PutUserSuccess implements Action {
  readonly type = PUT_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class PutUserFailed implements Action {
  readonly type = PUT_USER_FAILED;
}

export type UserActions = PutUser | PutUserSuccess | PutUserFailed;
