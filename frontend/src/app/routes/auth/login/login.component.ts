import { Component } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import axios from 'axios';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        });

        if (response.data && response.data.access_token) {
          this.authService.saveToken(response.data.access_token);

          if (this.authService.isAdmin()) {
            this.router.navigate(['/requests']);
          } else {
            this.router.navigate(['/my-orders']);
          }
        } else {
          this.errorMessage = 'Falha no login, token não recebido';
          this.cdr.detectChanges();
        }
      } catch (error) {
        this.errorMessage =
          'Não foi possível acessar a sua conta, tente novamente.';
        this.cdr.detectChanges();
        console.error('Erro ao fazer login:', error);
      }
    } else {
      this.errorMessage = 'Formulário inválido. Verifique as credenciais.';
      this.cdr.detectChanges();
    }
  }
}
