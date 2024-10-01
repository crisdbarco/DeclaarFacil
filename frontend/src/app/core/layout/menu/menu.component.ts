import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    HeaderComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  isAdmin: boolean = false;
  currentOpenItem: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.checkCurrentRoute();
  }

  toggleMenu(menuItem: string | null): void {
    if (this.currentOpenItem === menuItem) {
      this.currentOpenItem = null;
    } else {
      this.currentOpenItem = menuItem;
    }
  }

  checkCurrentRoute(): void {
    const currentRoute = this.router.url;

    if (currentRoute.includes('/address')) {
      this.currentOpenItem = 'declaracoes';
    } else if (
      currentRoute.includes('/clients') ||
      currentRoute.includes('/users')
    ) {
      this.currentOpenItem = 'administracao';
    } else {
      this.currentOpenItem = null;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
