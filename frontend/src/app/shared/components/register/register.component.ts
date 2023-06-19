import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';
interface Category {
  value: string;
  viewValue: string;
}
interface Location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userRegisterForm!: FormGroup;
  sellerRegisterForm!: FormGroup;
  selectedCategory: string;
  selectedLocation: string;

  categories: Category[] = [
    { value: 'Food', viewValue: 'Food' },
    { value: 'Clothes', viewValue: 'Clothes' },
    { value: 'Shoes', viewValue: 'Shoes' },
  ];
  locations: Location[] = [
    { value: 'Bangalore', viewValue: 'Bangalore' },
    { value: 'Delhi', viewValue: 'Delhi' },
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userRegisterForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidate }
    );
    this.sellerRegisterForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        shopName: ['', [Validators.required]],
        location: ['', [Validators.required]],
        category: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  userRegister() {
    if (this.userRegisterForm.valid) {
      const userData = this.userRegisterForm.value;
      delete userData.confirmPassword;
      this.auth.userSignUp(userData).subscribe({
        next: (response) => {
          if (response.success === true) {
            const sessionData = {
              isAuthenticated: true,
              role: 'user',
              token: response.token,
              username: response.user.firstName + response.user.lastName,
              userid: response.user._id,
            };
            this.session.saveSession(sessionData);
            this.router.navigate([`home`]);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  sellerRegister() {
    if (this.sellerRegisterForm.valid) {
      // Handle login logic here
      const registerData = this.sellerRegisterForm.value;
      delete registerData.confirmPassword;
      delete registerData.firstName;
      delete registerData.lastName;

      this.auth.sellerSignUp(registerData).subscribe({
        next: (response) => {
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
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  // custom confirm Password Validator for Seller
  passwordMatchValidator(control: FormControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
  //custom confirm Password Validator for User
  passwordMatchValidate(control: FormControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }
}
