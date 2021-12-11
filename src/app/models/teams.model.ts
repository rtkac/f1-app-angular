export interface Team {
  id: number;
  name: string;
  logo: string;
  president: string;
  director: string;
  technical_manager: string;
  engine: string;
  tyres: string;
}

export interface TeamsResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: Team[];
}

export interface FavouriteTeam {
  favouriteTeam: Team;
}
