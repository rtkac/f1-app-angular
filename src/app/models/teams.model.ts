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

export interface Teams {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: Team[];
}
