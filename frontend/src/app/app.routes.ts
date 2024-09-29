import { Routes } from '@angular/router';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { LoginComponent } from './components/login/login.component';
import { DeclarationsComponent } from './components/declarations/declarations.component';
import { AddressComponent } from './components/address/address.component';
import { ClientsComponent } from './components/clients/clients.component';
import { UsersComponent } from './components/users/users.component';
import { OtherDeclarationsComponent } from './components/other-declarations/other-declarations.component';
import { RequestsComponent } from './components/requests/requests.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { SuccessComponent } from './components/success/success.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-orders',
    pathMatch: 'full',
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
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
    path: 'requests',
    component: RequestsComponent,
    canActivate: [AuthGuard],
    title: 'Declara Fácil - Solicitações',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];
