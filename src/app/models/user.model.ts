export interface User {
  firstName: string;
  lastName: string;
  email: string;
  favouriteTeamId: number;
}

export interface PatchUserBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  favouriteTeamId?: number;
}
