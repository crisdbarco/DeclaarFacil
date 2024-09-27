import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MeusPedidosComponent } from './components/meus-pedidos/meus-pedidos.component';
import { AuthGuard } from './guards/auth.guard';
import { NgOptimizedImage } from '@angular/common';
import { routes } from './app.routes';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeusPedidosComponent,
    PageNotFoundComponent,
    // Não precisa declarar MenuComponent, pois ele é standalone
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgOptimizedImage,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
