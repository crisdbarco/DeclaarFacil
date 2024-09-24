import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp?: number;
  role?: string;
  is_admin?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Armazena o token no localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Verifica se o usuário está logado
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

  // Verifica se o usuário é admin
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.is_admin || false; // Retorna verdadeiro se for admin
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}