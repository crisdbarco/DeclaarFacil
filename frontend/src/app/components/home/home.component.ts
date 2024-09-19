import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    this.router.navigate(['/login']);
  }
}
