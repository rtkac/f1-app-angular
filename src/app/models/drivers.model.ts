export interface Driver {
  id: number;
  name: string;
  image: string;
}

export interface DriversResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: Driver[];
}

export interface DriverDetail {
  id: number;
  name: string;
  image: string;
  nationality: string;
  birthdate: Date;
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

export interface DriverDetailResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: DriverDetail[];
}
