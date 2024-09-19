import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log('Token no Guard:', token); // Adicione esta linha para depuração

    if (token && this.isTokenValid(token)) {
      // Token existe e é válido, permitir acesso
      return true;
    } else {
      // Token ausente ou expirado, redirecionar para a página de login
      localStorage.removeItem('token'); // Remover o token expirado
      this.router.navigate(['/login']);
      return false;
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiration = payload.exp * 1000; // converter para milissegundos
      const now = new Date().getTime();

      return now < expiration;
    } catch (e) {
      // Se houver um erro ao decodificar o token, consideramos inválido
      return false;
    }
  }
}