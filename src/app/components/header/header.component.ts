import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  loginSubscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginSubscription = this.authService.isUserLoggedIn.subscribe((loggedIn) => (this.isLoggedIn = loggedIn));
  }

  onLogout(): void {
    this.authService.logout();
    this.loginSubscription.unsubscribe();
  }
}
