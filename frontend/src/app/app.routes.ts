import { Routes } from '@angular/router';
import { MeusPedidosComponent } from './components/meus-pedidos/meus-pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { DeclarationsComponent } from './components/declarations/declarations.component';
import { AddressComponent } from './components/address/address.component';
import { ClientsComponent } from './components/clients/clients.component';
import { UsersComponent } from './components/users/users.component';
import { OtherDeclarationsComponent } from './components/other-declarations/other-declarations.component'; // Importe o componente
import { SolicitacoesComponent } from './components/solicitacoes/solicitacoes.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MeusPedidosComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Declara Fácil - Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Declara Fácil - Criar conta',
  },
  {
    path: 'declarations', // Se você quiser que este seja um link direto
    component: DeclarationsComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Declarações',
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Endereço',
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Clientes',
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Usuários',
  },
  {
    path: 'other-declarations', // Rota para o componente de declarações
    component: OtherDeclarationsComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Outras Declarações',
  },
  {
    path: 'solicitacoes', // Adicione a nova rota
    component: SolicitacoesComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Solicitações', // Título da rota
  },
  {
    path: '**',
    redirectTo: '',
  },
];
