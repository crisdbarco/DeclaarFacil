import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenerateDeclarationConfirmComponent } from '../../admin/requests/dialog/generate-declaration-confirm/generate-declaration-confirm.component';
import { RequestsService } from '../../../shared/services/api/requests.service';
import { MatTableModule } from '@angular/material/table'; // Importar apenas o MatTableModule
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

interface Request {
  id: number;
  date: string;
  status: 'processing' | 'completed' | 'rejected';
}
@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  requests: Request[] = []; // Agora tipado corretamente
  displayedColumns: string[] = ['id', 'date', 'status']; // Colunas da tabela
  isRequestInProgress = false; // Controle do botão
  errorMessage = ''; // Mensagem de erro

  constructor(
    private requestsService: RequestsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  // Função para carregar solicitações do backend
  loadRequests(): void {
    this.requestsService.getRequests().subscribe((data: Request[]) => {
      this.requests = data;

      // Verifica se existe alguma solicitação em andamento
      this.isRequestInProgress = this.requests.some(
        (request: Request) => request.status === 'processing'
      );

      // Verifica se a última solicitação foi completada ou rejeitada
      const lastRequest = this.requests[this.requests.length - 1];
      if (lastRequest && lastRequest.status === 'processing') {
        this.errorMessage =
          'Você só pode solicitar uma nova declaração quando a solicitação anterior estiver completa ou rejeitada.';
      } else {
        this.errorMessage = '';
      }
    });
  }

  // Função para abrir o modal de solicitação
  openRequestDialog(): void {
    const dialogRef = this.dialog.open(GenerateDeclarationConfirmComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.submitRequest(); // Chame a função para enviar a solicitação se confirmado
      }
    });
  }

  // Função para enviar a nova solicitação
  submitRequest(): void {
    this.loadRequests(); // Recarregar solicitações após a nova solicitação
  }
}
