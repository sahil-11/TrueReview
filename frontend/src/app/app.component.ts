import { Component, OnInit } from '@angular/core';
import { COOKIE_KEY } from './shared/constants/constants';
import { SessionService } from './shared/services/session/session.service';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
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

  logout() {
    if (this.role !== null && this.role === 'user') {
      this.logoutUser();
    }
    if (this.role !== null && this.role === 'seller') {
      this.logoutSeller();
    }
  }

  logoutSeller() {
    this.auth.logoutSeller().subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.isAuthenticated = false;
          this.session.clearSession();
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logoutUser() {
    this.auth.logoutUser().subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.isAuthenticated = false;
          this.session.clearSession();
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Snackbar that opens with success background
}
