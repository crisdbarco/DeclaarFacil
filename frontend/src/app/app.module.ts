import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AuthGuard } from './guards/auth.guard';
import { NgOptimizedImage } from '@angular/common';
import { routes } from './app.routes';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyOrdersComponent,
    PageNotFoundComponent,
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
export class AppModule { }
