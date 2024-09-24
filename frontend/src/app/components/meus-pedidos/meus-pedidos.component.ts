import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-home',
  standalone: true, // Se estiver usando como standalone
  imports: [CommonModule, MenuComponent], // Importando o CommonModule e o MenuComponent
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css']
})
export class MeusPedidosComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}