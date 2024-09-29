import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token && this.isTokenValid(token)) {
      return true;
    } else {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000;
      const now = new Date().getTime();

      return now < expiration;
    } catch (e) {
      return false;
    }
  }
}
