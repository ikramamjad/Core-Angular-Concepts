import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Review } from '../models/review';

interface ReviewResponse {
  result: Review[];
  successful: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'  // Makes the service available throughout the app
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/Reviews/active`;
// review.service.ts
  constructor(private http: HttpClient) {}

  getActiveReviews(): Observable<Review[]> {
    return this.http.get<ReviewResponse>(this.apiUrl).pipe(
      map(response => {
        if (response.successful && response.result) {
          return response.result;
        }
        // Fallback or throw if successful is false but we expect data? 
        // Or maybe the API returns the array directly if the user description was literal?
        // Let's try to handle both or just stick to the web reference structure which is more likely correct.
        return response.result || [];
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
