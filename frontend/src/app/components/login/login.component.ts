import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import axios from 'axios';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa o Router
import { CommonModule } from '@angular/common'; // Importa o CommonModule para usar *ngIf

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Adiciona uma variável para a mensagem de erro

  constructor(private fb: FormBuilder, private router: Router) {
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
          // Redireciona para a página principal
          this.router.navigate(['/home']); // Adiciona a navegação após o login bem-sucedido
        } else {
          this.errorMessage = 'Falha no login, token não recebido'; // Define a mensagem de erro genérica
        }
      } catch (error) {
        this.errorMessage = 'Não foi possível acessar a sua conta, tente novamente.'; // Define a mensagem de erro genérica
        console.error('Erro ao fazer login:', error);
      }
    } else {
      this.errorMessage = 'Não foi possível acessar a sua conta, tente novamente.'; // Define a mensagem de erro genérica
      console.error('Formulário inválido');
    }
  }
}


