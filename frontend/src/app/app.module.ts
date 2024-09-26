import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
<<<<<<< Updated upstream
import { HomeComponent } from './components/home/home.component';
=======
>>>>>>> Stashed changes
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< Updated upstream
    HomeComponent,
    // outros componentes...
=======
    // Não precisa declarar MenuComponent, pois ele é standalone
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // Configuração do RouterModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}