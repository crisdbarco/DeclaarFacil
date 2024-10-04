import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp?: number;
  is_admin?: boolean;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.exp ? decodedToken.exp * 1000 > Date.now() : false;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  getUserName(): string {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.name || '';
      } catch (error) {
        return '';
      }
    }
    return '';
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.is_admin || false;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
