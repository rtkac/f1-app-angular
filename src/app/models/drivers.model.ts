export interface Driver {
  id: number;
  name: string;
  number: number;
  image: string;
}

export interface DriverDetail {
  id: number;
  name: string;
  number: number;
  image: string;
  team: string;
  country: string;
  birthdate: string;
  podiums: number;
  points: number;
  worldChampionships: number;
  teams: DriverDetailTeam[];
}

export interface DriverDetailTeam {
  season: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
}
