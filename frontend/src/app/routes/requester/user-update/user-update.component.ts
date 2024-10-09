import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import axios from 'axios';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-user-update',
  standalone: true,
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class UserUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  isLoading = false;
  states: string[] = ['AC', 'AL', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 
    'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private authService: AuthService // Injetar AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData(); 
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

  async loadUserData() {
    try {
      this.isLoading = true;
      const response = await axios.get('http://localhost:3000/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Atualiza o nome do usuário no AuthService
      this.authService.updateUserName(response.data.name); // Atualiza o BehaviorSubject com o nome do usuário
  
      // Preenche o formulário com os dados do usuário
      this.updateForm.patchValue(response.data);
    } catch (error) {
      this.errorMessage = 'Erro ao carregar os dados do usuário.';
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit() {
    if (this.updateForm.invalid) return;

    try {
      this.isLoading = true;
      const updatedData = this.updateForm.value;

      await axios.put('http://localhost:3000/users/', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      this.authService.updateUserName(updatedData.name); // Atualiza o nome do usuário no AuthService

      this.snackBar.open('Dados atualizados com sucesso!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      this.router.navigate(['/profile']);
    } catch (error) {
      this.errorMessage = 'Erro ao atualizar os dados.';
    } finally {
      this.isLoading = false;
    }
  }
}