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
  default = {
    isAuthenticated: false,
    role: null,
    token: '',
    userid: '',
    username: '',
  };
  private authenticatedUser: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.default
  );
  saveSession(sessionData: any): void {
    this.cookieService.set(this.COOKIE_KEY, JSON.stringify(sessionData));
    this.getAuthenticatedUser();
  }

  getSession(): any {
    let sessionData = this.default;
    sessionData = JSON.parse(this.cookieService.get(this.COOKIE_KEY));
    if (sessionData.isAuthenticated) {
      this.authenticatedUser.next(sessionData);
      return sessionData;
    }
    return sessionData;
  }

  clearSession(): void {
    this.cookieService.delete(this.COOKIE_KEY);
    this.authenticatedUser.next(this.default);
  }
  //get Authenticated User Value by subscribing in component
  getAuthenticatedUser(): BehaviorSubject<any> {
    this.getSession();
    return this.authenticatedUser;
  }
}
