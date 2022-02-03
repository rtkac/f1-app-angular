export interface Team {
  id: number;
  name: string;
  fullName: string;
  logo: string;
  base: string;
  teamChief: string;
  technicalChief: string;
  chasis: string;
  powerUnit: string;
  firstTeamEntry: string;
  worldChampionships: number;
  polePositions: number;
  fastestLaps: number;
  drivers: TeamDriver[];
}

export interface TeamDriver {
  id: number;
  name: string;
  number: number;
  image: string;
}

export interface FavouriteTeam {
  favouriteTeam: Team;
}
