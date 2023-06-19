import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constants/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seller } from '../../models/sellerModel';
import { User, UserResponse } from '../../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

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

  // isSellerLoggedIn(value: boolean) {
  //   this.sellerLoggedIn.next({ isAuthenticated: value, role: 'seller' });
  // }
}
