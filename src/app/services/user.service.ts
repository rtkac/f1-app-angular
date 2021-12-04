import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { userEndpoint } from '../config/endopoints';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<User>(userEndpoint);
  }
}
