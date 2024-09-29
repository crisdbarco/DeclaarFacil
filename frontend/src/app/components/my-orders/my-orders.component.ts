import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  constructor(private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
