import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL } from 'src/app/shared/constants/constants';
import { ReviewModel } from 'src/app/shared/models/reviewModel';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient) {}

  getReviews(id: string): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(URL.baseUrl + `/api/review/show/${id}`);
  }

  getShop(id: string): Observable<any> {
    return this.http.get<any>(URL.baseUrl + `/api/shop/${id}`);
  }
}
