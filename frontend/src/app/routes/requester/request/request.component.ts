import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeclarationRequestService } from '../../../shared/services/declaration-request.service';
import { GenerateDeclarationConfirmComponent } from '../../admin/requests/dialog/generate-declaration-confirm/generate-declaration-confirm.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RequestsService } from '../../../shared/services/api/requests.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class SolicitacaoComponent implements OnInit {
  requests = []; // Lista de solicitações do usuário
  displayedColumns: string[] = ['id', 'date', 'status']; // Colunas da tabela
  isRequestInProgress = false; // Controle do estado do botão

  constructor(
    private requestsService: RequestsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  // Carrega as solicitações do backend
  loadRequests(): void {
    this.requestsService.getRequests().subscribe((data: any) => {
      this.requests = data;

      // Verifica se existe alguma solicitação em andamento
      this.isRequestInProgress = this.requests.some(
        (request: any) => request.status === 'processing'
      );
    });
  }

  // Abre o modal de confirmação para solicitar nova declaração
  openRequestDialog(): void {
    const dialogRef = this.dialog.open(GenerateDeclarationConfirmComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.submitRequest(); // Envia nova solicitação se confirmado
      }
    });
  }

  // Função para enviar uma nova solicitação
  submitRequest(): void {
    // Aqui você enviaria a solicitação ao backend
    // Exemplo: this.declarationService.createRequest().subscribe(...);
    this.loadRequests(); // Recarrega as solicitações após o envio
  }
}
