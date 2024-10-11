import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  deleteUser(password: string): Observable<any> {
    const url = `${this.apiUrl}/users/inactivate`;

    const options = {
      body: { password },
    };

    return this.http.delete<any>(url, options);
  }
}
