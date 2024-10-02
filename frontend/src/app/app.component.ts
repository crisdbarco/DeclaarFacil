import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { MenuComponent } from './core/layout/menu/menu.component';
import { FooterComponent } from './core/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Declara fácil';
}
