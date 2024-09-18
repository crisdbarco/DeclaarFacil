import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Dados de login vinculados ao formulário
  loginData = { email: '', password: '' };

  // Função que faz a requisição de login
  async onSubmit() {
    try {
      // Envia a requisição ao backend usando Axios
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: this.loginData.email,
        password: this.loginData.password
      });

      // Verifica se o token foi retornado
      if (response.data && response.data.token) {
        console.log('Login bem-sucedido! Token:', response.data.token);
        // Salva o token no localStorage
        localStorage.setItem('token', response.data.token);
      } else {
        console.error('Falha no login, token não recebido');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }
}


