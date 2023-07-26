import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_KEY } from '../../constants/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly COOKIE_KEY = 'loggedIn';

  constructor(private cookieService: CookieService) {}
  default = JSON.stringify({
    isAuthenticated: false,
    role: null,
    token: '',
    userid: '',
    username: '',
  });
  private authenticatedUser: BehaviorSubject<any> = new BehaviorSubject<any>(
    JSON.parse(this.default)
  );

  saveSession(sessionData: any): void {
    this.cookieService.set(this.COOKIE_KEY, JSON.stringify(sessionData));
    this.setAuthenticatedUser(sessionData);
  }

  getSession(): any {
    let sessionData = JSON.parse(this.default);
    if (this.cookieService.get(this.COOKIE_KEY) !== '') {
      sessionData = JSON.parse(this.cookieService.get(this.COOKIE_KEY));
    }

    if (sessionData.isAuthenticated) {
      this.setAuthenticatedUser(sessionData);
      return sessionData;
    }
    this.setAuthenticatedUser(sessionData);
    return sessionData;
  }

  // Method invoked on logout to clear session
  clearSession(): void {
    this.cookieService.delete(this.COOKIE_KEY);
    this.setAuthenticatedUser(JSON.parse(this.default));
  }

  //get Authenticated User Value by subscribing in component
  getAuthenticatedUser(): BehaviorSubject<any> {
    return this.authenticatedUser;
  }

  //set authenticated user Value for subject
  setAuthenticatedUser(data: any) {
    this.authenticatedUser.next(data);
  }
}
