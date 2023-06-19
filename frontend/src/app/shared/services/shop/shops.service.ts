import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from '../../constants/constants';
import { Shops } from '../../models/ShopsModel';
import { ReviewModel } from '../../models/reviewModel';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  constructor(private http: HttpClient) {}

  getShops(param: { location: string; category: string }): Observable<Shops> {
    // let params = new HttpParams();
    // params.set('location', param.location);
    // params.set('category', param.category);
    return this.http.get<Shops>(
      URL.baseUrl +
        '/api/shops/show' +
        `?location=${param.location}&cat=${param.category}`
    );
  }

  getReviews(id: string): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(URL.baseUrl + `/api/review/show/${id}`);
  }

  getShop(id: string): Observable<any> {
    return this.http.get<any>(URL.baseUrl + `/api/shop/${id}`);
  }
}
