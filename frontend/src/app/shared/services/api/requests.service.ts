import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/requests`);
  }

  getRequestsWithDeclarations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/requests/with-declarations`);
  }

  generatePDF(requestIds: string[]): Observable<any> {
    const url = `${this.apiUrl}/requests/generate-pdf`;

    const payload = {
      requestIds: requestIds,
    };

    return this.http.post<any>(url, payload);
  }

  updateStatus(
    requestIds: string[],
    status: 'rejected' | 'completed'
  ): Observable<any> {
    const url = `${this.apiUrl}/requests/update-status`;

    const payload = {
      requestIds: requestIds,
      status,
    };

    return this.http.patch<any>(url, payload);
  }
}
