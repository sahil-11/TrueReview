import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../components/customsnackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackBar: MatSnackBar) {}

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'X', {
      panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'X', {
      panelClass: ['success'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
