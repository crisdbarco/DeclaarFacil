import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarationsService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getDeclarationsType(): Observable<any> {
    return this.http.get(`${this.apiUrl}/declarations/type`);
  }
}
