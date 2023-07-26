import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { URL } from '../../constants/constants';
import { Shops } from '../../models/ShopsModel';
import { ReviewModel } from '../../models/reviewModel';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  constructor(private http: HttpClient) {}

  getShops(param: {
    location: string;
    category: string;
    pageIndex: number;
    pageSize: number;
  }): Observable<Shops> {
    return this.http.get<Shops>(
      URL.baseUrl +
        '/api/shops/show' +
        `?location=${param.location}&cat=${param.category}&pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`
    );
  }

  getReviews(
    id: string,
    param: {
      pageIndex: number;
      pageSize: number;
    }
  ): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(
      URL.baseUrl +
        `/api/review/show/${id}` +
        `?pageIndex=${param.pageIndex}&pageSize=${param.pageSize}`
    );
  }

  getShop(id: string): Observable<any> {
    return this.http.get<any>(URL.baseUrl + `/api/shop/${id}`);
  }

  addImage(params: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: `${token}`,
    });
    return this.http.post<any>(URL.baseUrl + '/api/shop/addphoto', params, {
      headers,
    });
  }
  editImage(params: any, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: `${token}`,
    });
    return this.http.patch<any>(URL.baseUrl + '/api/shop/updatephoto', params, {
      headers,
    });
  }
}
