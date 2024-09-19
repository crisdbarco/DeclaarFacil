import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'; // Importa o HomeComponent
import { AuthGuard } from './guards/auth.guard'; // Importar o AuthGuard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home', //rota para a página principal
    component: HomeComponent,
    canActivate: [AuthGuard],  // Proteger a rota home
  },
  {
    path: '**', // Caso a rota não exista, redirecione para login ou home
    redirectTo: 'login',
  },
];
