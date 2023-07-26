import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageuploadService {
  constructor(private http: HttpClient) {}
  //upload signature
  uploadSignature(vals: any): Observable<any> {
    let data = vals;
    return this.http.post(
      'https://api.cloudinary.com/v1_1/cloud_name/image/upload',
      data
    );
  }
}
