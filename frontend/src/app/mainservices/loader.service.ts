import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  private isLoading = false;

  show(): void {
    this.isLoading = true;
    // Show the loader UI or perform any other actions
  }

  hide(): void {
    this.isLoading = false;
    // Hide the loader UI or perform any other actions
  }

  getLoadingState(): boolean {
    return this.isLoading;
  }
}
