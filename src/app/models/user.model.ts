export interface User {
  firstName: string;
  surName: string;
  email: string;
  favouriteTeamId: number;
}

export interface PatchUserBody {
  firstName?: string;
  surName?: string;
  email?: string;
  favouriteTeamId?: number;
}
