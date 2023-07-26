import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constants/constants';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Seller } from '../../models/sellerModel';
import { User, UserResponse } from '../../models/userModel';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // baseUrl = 'http://localhost:9000';
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private session: SessionService) {}

  userLogin(form: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(URL.baseUrl + '/api/signin', form);
  }

  sellerLogin(form: any): Observable<Seller> {
    return this.http.post<Seller>(URL.baseUrl + '/api/shop/signin', form);
  }

  userSignUp(form: any): Observable<UserResponse> {
    return this.http.post<UserResponse>(URL.baseUrl + '/api/signup', form);
  }

  sellerSignUp(form: any): Observable<Seller> {
    return this.http.post<Seller>(URL.baseUrl + '/api/shop/signup', form);
  }

  logoutUser() {
    return this.http.get(URL.baseUrl + '/api/logout');
  }

  logoutSeller() {
    return this.http.get(URL.baseUrl + '/api/shop/logout');
  }

  getAuthenticated() {
    this.session.getAuthenticatedUser().subscribe((res) => {
      this.isAuthenticated = res.isAuthenticated;
    });
    return this.isAuthenticated;
  }
}
