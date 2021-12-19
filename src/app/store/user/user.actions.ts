import { Action } from '@ngrx/store';

import { User, PatchUserBody } from 'src/app/models/user.model';

export const GET_USER_TRIGGERED = '[User] Get User Triggered';
export const GET_USER_SUCCESS = '[User] Get User Success';
export const GET_USER_FAILED = '[User] Get User Failed';

export const PATCH_USER_TRIGGERED = '[User] Patch User Triggered';
export const PATCH_USER_SUCCESS = '[User] Patch User Success';
export const PATCH_USER_FAILED = '[User] Patch User Failed';

export class GetUser implements Action {
  readonly type = GET_USER_TRIGGERED;
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class GetUserFailed implements Action {
  readonly type = GET_USER_FAILED;
}

export class PatchUser implements Action {
  readonly type = PATCH_USER_TRIGGERED;

  constructor(public payload: PatchUserBody) {}
}

export class PatchUserSuccess implements Action {
  readonly type = PATCH_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class PatchUserFailed implements Action {
  readonly type = PATCH_USER_FAILED;
}

export type UserActions = GetUser | GetUserSuccess | GetUserFailed | PatchUser | PatchUserSuccess | PatchUserFailed;
