import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.apiUrl}/ContactUs/CreateSubscriber`;

  constructor(private http: HttpClient) {}

  subscribe(email: string): Observable<any> {
    // The API likely expects an object, usually { email: "..." } or similar.
    return this.http.post(this.apiUrl, { email });
  }
}
