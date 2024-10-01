import { Routes } from '@angular/router';
import { DeclarationsComponent } from './routes/admin/declarations/declarations.component';
import { AddressComponent } from './routes/requester/declaration/address/address.component';
import { ClientsComponent } from './routes/admin/clients/clients.component';
import { OtherDeclarationsComponent } from './routes/admin/other-declarations/other-declarations.component';
import { RequestsComponent } from './routes/admin/requests/requests.component';
import { AuthGuard } from './guards/auth.guard';
import { SuccessComponent } from './routes/auth/register/success/success.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { RegisterComponent } from './routes/auth/register/register.component';
import { MyOrdersComponent } from './routes/requester/my-orders/my-orders.component';
import { UsersComponent } from './routes/admin/users/users.component';

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
    title: 'Minhas solicitações',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Criar conta',
  },
  { path: 'success', component: SuccessComponent },
  {
    path: 'declarations',
    component: DeclarationsComponent,
    canActivate: [AuthGuard],
    title: 'Declarações',
  },
  {
    path: 'address',
    component: AddressComponent,
    canActivate: [AuthGuard],
    title: 'Endereço',
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    title: 'Clientes',
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    title: 'Usuários',
  },
  {
    path: 'other-declarations',
    component: OtherDeclarationsComponent,
    canActivate: [AuthGuard],
    title: 'Outras Declarações',
  },
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [AuthGuard],
    title: 'Solicitações',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
