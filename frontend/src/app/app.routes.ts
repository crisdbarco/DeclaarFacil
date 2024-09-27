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
import { SuccessComponent } from './components/success/success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'meus-pedidos', // Redireciona para meus-pedidos por padrão
    pathMatch: 'full' // Verifica se o caminho é vazio
  },
  {
    path: 'meus-pedidos', // rota para Meus Pedidos
    component: MeusPedidosComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Meus Pedidos',
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
  { path: 'success', component: SuccessComponent },
  {
    path: 'declarations',
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
    path: 'other-declarations',
    component: OtherDeclarationsComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Outras Declarações',
  },
  {
    path: 'solicitacoes',
    component: SolicitacoesComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Solicitações',
  },
  {
    path: '**',
    component: PageNotFoundComponent, // Utilize o componente aqui
  },
  {
    path: '**',
  component: PageNotFoundComponent, // Redireciona para not-found para qualquer rota não encontrada
  },
];
