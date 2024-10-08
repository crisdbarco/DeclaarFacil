import { Routes } from '@angular/router';
import { DeclarationsComponent } from './routes/admin/declarations/declarations.component';
import { AddressComponent } from './routes/requester/declaration/address/address.component';
import { ClientsComponent } from './routes/admin/clients/clients.component';
import { OtherDeclarationsComponent } from './routes/admin/other-declarations/other-declarations.component';
import { RequestsComponent } from './routes/admin/requests/requests.component';
import { AuthGuard } from './core/providers/auth.guard';
import { SuccessComponent } from './routes/auth/register/success/success.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { RegisterComponent } from './routes/auth/register/register.component';
import { MyOrdersComponent } from './routes/requester/my-orders/my-orders.component';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './core/layout/private-layout/private-layout.component';
import { RequesterGuard } from './core/providers/requester.guard';
import { AdminGuard } from './core/providers/admin.guard';
import { CompletedDeclarationsComponent } from './routes/admin/completed-declarations/completed-declarations.component';
import { SummaryComponent } from './routes/admin/requests/summary/summary.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-orders',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Criar conta',
      },
      { path: 'success', component: SuccessComponent },
    ],
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        title: 'Minhas solicitações',
        canActivate: [RequesterGuard],
      },
      {
        path: 'requests',
        title: 'Solicitações',
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            component: RequestsComponent,
            title: 'Gestão de solicitações',
          },
          {
            path: 'summary',
            component: SummaryComponent,
            title: 'Declarações geradas',
          },
        ],
      },
      {
        path: 'completed-declarations',
        component: CompletedDeclarationsComponent,
        title: 'Declarações geradas',
        canActivate: [AdminGuard],
      },
      // {
      //   path: 'declarations',
      //   component: DeclarationsComponent,
      //   title: 'Declarações',
      // },
      // {
      //   path: 'address',
      //   component: AddressComponent,
      //   title: 'Endereço',
      // },
      // {
      //   path: 'clients',
      //   component: ClientsComponent,
      //   title: 'Clientes',
      // },
      // {
      //   path: 'users',
      //   component: UsersComponent,
      //   title: 'Usuários',
      // },
      // {
      //   path: 'other-declarations',
      //   component: OtherDeclarationsComponent,
      //   title: 'Outras Declarações',
      // },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
