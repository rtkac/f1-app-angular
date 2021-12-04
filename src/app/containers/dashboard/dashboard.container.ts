import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { teamsEndpoint } from 'src/app/config/endopoints';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.container.html',
})
export class DashboardContainer implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(teamsEndpoint).subscribe((res) => console.log(res));
  }
}
