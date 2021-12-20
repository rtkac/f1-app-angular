import { environment } from '../../environments/environment';

// API ENDPOINTS
export const seasonsEndpoint = `${environment.API_URL}/seasons`;
export const loginEndpoint = `${environment.API_URL}/login`;
export const userEndpoint = `${environment.API_URL}/user`;
export const teamsEndpoint = `${environment.API_URL}/teams`;
export const driversEndpoint = `${environment.API_URL}/drivers`;
export const driverEndpoint = (id: number) => `${environment.API_URL}/driver-detail/${id}`;
export const rankingsTeamsEndpoint = `${environment.API_URL}/rankings-teams/2021`;

// SPORT API ENDPOINTS
// export const seasonsEndpoint = `${environment.SPORTS_API_URL}/seasons`;
// export const teamsEndpoint = `${environment.SPORTS_API_URL}/teams`;
// export const driversEndpoint = `${environment.SPORTS_API_URL}/drivers`;
