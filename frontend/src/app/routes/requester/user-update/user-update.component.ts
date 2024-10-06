import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { Router } from '@angular/router'; // Importar Router
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importar MatProgressSpinner

@Component({
  selector: 'app-user-update',
  standalone: true,
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  imports: [
    // Importações standalone
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatProgressSpinnerModule // Adicionar MatProgressSpinner aqui
  ]
})
export class UserUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  isLoading = false;
  states: string[] = ['AC', 'AL', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 
    'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData(); // Carrega os dados do usuário ao inicializar a página
  }

  initializeForm() {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      issuing_agency: ['', Validators.required],
      postal_code: ['', Validators.required],
      street: ['', Validators.required],
      house_number: ['', Validators.required],
      complement: [''],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  // Requisição GET para buscar os dados do usuário
  async loadUserData() {
    try {
      this.isLoading = true;
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Envia o token JWT
        }
      });
      
      // Atualiza o formulário com os dados do usuário
      this.updateForm.patchValue(response.data);
    } catch (error) {
      this.errorMessage = 'Erro ao carregar os dados do usuário.';
    } finally {
      this.isLoading = false;
    }
  }

  // Método para submeter o formulário e enviar os dados atualizados
  async onSubmit() {
    if (this.updateForm.invalid) return;

    try {
      this.isLoading = true;
      const updatedData = this.updateForm.value;

      await axios.put('http://localhost:3000/users/', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Envia o token JWT
        }
      });

      // Exibir toast de sucesso e redirecionar para a página de visualização
      this.snackBar.open('Dados atualizados com sucesso!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.router.navigate(['/profile']); // Redireciona para a página de visualização de perfil
    } catch (error) {
      this.errorMessage = 'Erro ao atualizar os dados.';
    } finally {
      this.isLoading = false;
    }
  }
}