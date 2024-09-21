import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import axios from 'axios';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrigir o nome do arquivo de estilo
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
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
          password: this.loginForm.value.password
        });

        if (response.data && response.data.access_token) {
          console.log('Login bem-sucedido! Token:', response.data.access_token);
          localStorage.setItem('token', response.data.access_token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Falha no login, token não recebido';
        }
      } catch (error) {
        this.errorMessage = 'Não foi possível acessar a sua conta, tente novamente.';
        console.error('Erro ao fazer login:', error);
      }
    } else {
      this.errorMessage = 'Não foi possível acessar a sua conta, tente novamente.';
      console.error('Formulário inválido');
    }
  }
}

