import { Component, OnInit } from '@angular/core';
import { COOKIE_KEY } from './shared/constants/constants';
import { SessionService } from './shared/services/session/session.service';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from './mainservices/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TrueReview';
  isAuthenticated = false;
  role: string | null = null;
  constructor(
    private session: SessionService,
    private router: Router,
    private snackBar: MatSnackBar,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {
    const data = this.getSession();
    if (data !== null) {
      this.role = data.role;
      this.isAuthenticated = data.isAuthenticated;
    }
  }

  getSession() {
    return this.session.getSession();
  }

  // Snackbar that opens with success background
}
