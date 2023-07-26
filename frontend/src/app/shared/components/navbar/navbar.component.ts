import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() authenticated: boolean;
  // @Input() role: string | null;
  // @Output() logout: EventEmitter<boolean> = new EventEmitter();

  isAuthenticated: boolean = false;
  role: string | null;
  username: string | null;
  private id: string;
  constructor(
    private router: Router,
    private session: SessionService,
    private auth: AuthenticationService,
    private snackbarService: SnackbarService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.session.getAuthenticatedUser().subscribe((_data) => {
      this.isAuthenticated = _data.isAuthenticated;
      this.role = _data.role;
      this.username = _data.username;
      this.id = _data.userid;
    });
  }

  navigateToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  goToMyShop() {
    this.router.navigate(['shops/' + this.id]);
  }
  logout() {
    console.log(this.role);
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
          this.snackbarService.showSuccessMessage('Logged Out Successfully');
        }
      },
      error: (error) => {
        console.log(error);
        this.snackbarService.showErrorMessage(error.error.error);
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
          this.snackbarService.showSuccessMessage('Logged Out Successfully');
        }
      },
      error: (error) => {
        console.log(error);
        this.snackbarService.showErrorMessage(error.error.error);
      },
    });
  }
}
