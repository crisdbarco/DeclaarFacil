import { Component, ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../shared/components/header/header.component';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // Adicionado ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.checkCurrentRoute();

    // Força a detecção de mudanças após a inicialização
    this.cdr.detectChanges();
  }

  toggleMenu(menuItem: string | null): void {
    if (this.currentOpenItem === menuItem) {
      this.currentOpenItem = null; // Fecha se o painel já estiver aberto
    } else {
      this.currentOpenItem = menuItem; // Abre o painel clicado
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

    // Força a detecção de mudanças após a verificação de rota
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a página de login após logout
  }
}
