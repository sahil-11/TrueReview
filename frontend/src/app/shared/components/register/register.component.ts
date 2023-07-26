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
import { categories, locations } from '../../constants/constants';
import { Category } from '../../models/categoryModel';
import { Location } from '../../models/locationModel';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// interface Category {
//   value: string;
//   viewValue: string;
// }
// interface Location {
//   value: string;
//   viewValue: string;
// }
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
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
  locations: Location[];
  categories: Category[];
  files: any[] = [];
  imageUploadSuccess = false;
  imageUrl: string;
  selectedFile: File;
  uploadingImg: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private session: SessionService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    public fireStorage: AngularFireStorage
  ) {}

  // In app.component.ts, configure the Cloudinary component:

  ngOnInit() {
    this.categories = categories;
    this.locations = locations;
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
        sellerImg: [null, [Validators.required]],
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
            this.snackbarService.showSuccessMessage(
              'You are successfully registered'
            );
            this.router.navigate([`home`]);
          }
        },
        error: (error) => {
          console.log(error);
          this.snackbarService.showErrorMessage(error.error.error);
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
      delete registerData.sellerImg;
      registerData.imageUrl = this.imageUrl;
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
            this.snackbarService.showSuccessMessage(
              'You are successfully registered'
            );
            this.router.navigate(['shops/' + response.shop._id]);
          }
        },
        error: (error) => {
          console.log(error);
          this.snackbarService.showErrorMessage(error.error.error);
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
  //File Upload
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileChange(pFileList: any) {
    this.files = Object.keys(pFileList).map((key: any) => pFileList[key]);
  }

  onFileChanges(file: any) {
    this.onFileChange(file?.files);
  }

  deleteFile(f: any) {
    this.files = this.files.filter(function (w) {
      return w.name != f.name;
    });
  }

  openConfirmDialog(pIndex: any): void {
    const dialogRef: any = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs',
    });
    dialogRef.componentInstance.fName = this.files[pIndex].name;
    dialogRef.componentInstance.fIndex = pIndex;

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  deleteFromArray(index: any) {
    console.log(this.files);
    this.files.splice(index, 1);
    if (this.files.length === 0) {
      this.sellerRegisterForm.controls['sellerImg'].reset();
    }
  }

  // async uploadImageToFirebaseStorage(): Promise<string> {
  //   const image: File = this.selectedFile;
  //   const storageRef = storage.ref();
  //   const imageName = `${new Date().getTime()}_${image.name}`;
  //   const imageRef = storageRef.child(imageName);

  //   await imageRef.put(image);
  //   const imageUrl = await imageRef.getDownloadURL();

  //   return imageUrl;
  // }

  uploadImage = async () => {
    let file = this.files[0];
    console.log(file);
    if (file) {
      this.uploadingImg = true;
      const path = `shops/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.uploadingImg = false;
      if (url) {
        this.imageUrl = url;
        this.imageUploadSuccess = true;
      }
    }
  };
}
