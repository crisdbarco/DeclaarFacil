import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import axios from 'axios';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa o formulário com validações
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        // Envia a requisição ao backend usando Axios
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        });

        // Verifica se o token foi retornado
        if (response.data && response.data.access_token) {
          console.log('Login bem-sucedido! Token:', response.data.access_token);
          // Salva o token no localStorage
          localStorage.setItem('token', response.data.access_token);
        } else {
          console.error('Falha no login, token não recebido');
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    } else {
      console.error('Formulário inválido');
    }
  }
}


