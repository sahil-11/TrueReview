import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../../constants/constants';
import { Observable } from 'rxjs';
import { Seller } from '../../models/sellerModel';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  addUID(id: string, token: string): Observable<Seller> {
    console.log(id, token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: `${token}`,
    });
    return this.http.post<Seller>(
      URL.baseUrl + '/api/shop/adduid',
      {
        transaction_id: id,
      },
      { headers }
    );
  }
  addReview(
    id: string,
    review: string,
    token: string,
    shopId: string
  ): Observable<Seller> {
    console.log(id, token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: `${token}`,
    });

    const payload = {
      transaction_id: id,
      review: review,
    };
    return this.http.post<Seller>(
      URL.baseUrl + `/api/review/add/${shopId}`,
      payload,
      { headers }
    );
  }
}
