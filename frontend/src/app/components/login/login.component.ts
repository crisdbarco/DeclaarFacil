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
import { AuthService } from '../../services/auth.service';


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
        // Envia a requisição ao backend usando Axios
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        });
  
        // Verifica se o token foi retornado
        if (response.data && response.data.access_token) {
          console.log('Login bem-sucedido! Token:', response.data.access_token);
          
          // Usa o AuthService para armazenar o token
          this.authService.saveToken(response.data.access_token);
  
          // Verifica se o usuário é admin ou comum e redireciona para a página correta
          if (this.authService.isAdmin()) {
            this.router.navigate(['/solicitacoes']); // Admin vai para "Solicitações"
          } else {
            this.router.navigate(['/meus-pedidos']); // Usuário comum vai para "Meus Pedidos"
          }
        } else {
          // Se o token não for recebido, mostra a mensagem de erro
          this.errorMessage = 'Falha no login, token não recebido';
          this.cdr.detectChanges(); // Força a detecção de mudanças
        }
      } catch (error) {
        // Exibe a mensagem de erro se houver falha na requisição
        this.errorMessage =
          'Não foi possível acessar a sua conta, tente novamente.';
        this.cdr.detectChanges(); // Força a detecção de mudanças
        console.error('Erro ao fazer login:', error);
      }
    } else {
      // Se o formulário for inválido, exibe a mensagem de erro imediatamente
      this.errorMessage = 'Formulário inválido. Verifique as credenciais.';
      this.cdr.detectChanges(); // Força a detecção de mudanças
    }
  }
}
