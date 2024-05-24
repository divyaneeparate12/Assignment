import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  private apiUrl = 'https://pv.greatfuturetechno.com/pv-api/dealer/';
  private headers = new HttpHeaders({
    Authorization: 'Token 084f2df6319f2729c860fd3d1393840e41f56f00',
  });

  constructor(private http: HttpClient) {}

  getDealers(): Observable<any> {
    return this.http
      .get(this.apiUrl, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getDealer(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?id=${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  createDealer(dealer: any): Observable<any> {
    return this.http
      .post(this.apiUrl, dealer, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  updateDealer(id: number, dealer: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}?id=${id}`, dealer, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  deleteDealer(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}?id=${id}`, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
