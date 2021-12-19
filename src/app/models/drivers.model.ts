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
