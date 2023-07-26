import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Seller } from '../../models/sellerModel';
import { SessionService } from '../../services/session/session.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userloginForm!: FormGroup;
  sellerloginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private session: SessionService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userloginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.sellerloginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  userLogin() {
    if (this.userloginForm.valid) {
      this.auth.userLogin(this.userloginForm.value).subscribe({
        next: (response) => {
          if (response.success == true) {
            const sessionData = {
              isAuthenticated: true,
              role: 'user',
              token: response.token,
              username: response.user.firstName + response.user.lastName,
              userid: response.user._id,
            };
            this.session.saveSession(sessionData);
            this.router.navigate([`home`]);
            this.snackbarService.showSuccessMessage('Logged In Successfully');
          }
        },
        error: (error) => {
          console.log(error);
          this.snackbarService.showErrorMessage('Wrong email or password');
        },
      });
    }
  }
  sellerLogin() {
    if (this.sellerloginForm.valid) {
      // Handle login logic here
      this.auth.sellerLogin(this.sellerloginForm.value).subscribe({
        next: (response: Seller) => {
          if (response?.success === true) {
            const sessionData = {
              isAuthenticated: true,
              role: 'seller',
              token: response.token,
              username: response.shop.shopName,
              userid: response.shop._id,
            };
            this.session.saveSession(sessionData);

            this.router.navigate(['shops/' + response.shop._id]);
            this.snackbarService.showSuccessMessage('Logged In Successfully');
          }
        },
        error: (error) => {
          console.log(error);
          this.snackbarService.showErrorMessage('Wrong email or password');
        },
      });
    }
  }
}
