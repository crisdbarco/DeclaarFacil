import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component'; // Importa o HomeComponent

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
    path: 'home', // Adicione a rota para a página principal
    component: HomeComponent,
  },
  {
    path: '**', // Caso a rota não exista, redirecione para login ou home
    redirectTo: 'login',
  },
];
