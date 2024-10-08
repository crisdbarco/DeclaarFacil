import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { DeclarationRequestType } from '../../../shared/domain/requests.type';
import { StatusPipe } from '../../../core/pipes/status.pipe';
import { MatDialog } from '@angular/material/dialog';
import { GenerateDeclarationConfirmComponent } from './dialog/generate-declaration-confirm/generate-declaration-confirm.component';
import { FinalizeDeclarationConfirmComponent } from './dialog/finalize-declaration-confirm/finalize-declaration-confirm.component';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DeclarationRequestService } from '../../../shared/services/declaration-request.service';
import { RequestsService } from '../../../shared/services/api/requests.service';

const RESPONSE_DATA: DeclarationRequestType[] = [
  {
    id: 'abc',
    name: 'Carlos Eduardo Pereira',
    requestDate: new Date('2024-10-01'),
    status: 'completed',
    url: 'https://example.com/declaration/carlos-eduardo.pdf',
  },
  {
    id: 'def',
    name: 'Ana Beatriz Silva',
    requestDate: new Date('2024-09-28'),
    status: 'completed',
    url: 'https://example.com/declaration/ana-beatriz.pdf',
  },
  {
    id: 'ghi',
    name: 'José da Silva',
    requestDate: new Date('2024-09-27'),
    status: 'completed',
    url: 'https://example.com/declaration/jose-da-silva.pdf',
  },
];

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    StatusPipe,
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent {
  displayedColumns: string[] = ['name', 'requestDate', 'status', 'select'];
  dataSource = [];
  selection = new SelectionModel<DeclarationRequestType>(true, []);
  dialog = inject(MatDialog);
  toast = inject(NgToastService);

  constructor(
    private router: Router,
    private declarationRequestService: DeclarationRequestService,
    private requestsService: RequestsService
  ) {}

  ngOnInit() {
    this.getRequests();
  }

  getRequests(): void {
    this.requestsService.getRequests().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: () => {
        this.toast.danger(
          'Tente novamente',
          'Falha ao carregar as solicitações',
          5000
        );
      },
    });
  }

  checkboxLabel(row: DeclarationRequestType): string {
    return `${
      this.selection.isSelected(row) ? 'deselecionar' : 'selecionar'
    } a pessoa ${row.name}`;
  }

  openGenerateDeclarationConfirmDialog() {
    const pendingRequests: DeclarationRequestType[] =
      this.selection.selected.filter(
        (request: DeclarationRequestType) => request.status === 'pending'
      );

    let dialogRef = this.dialog.open(GenerateDeclarationConfirmComponent, {
      data: {
        requests: pendingRequests,
      },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.generateDeclarations(pendingRequests);
      }
    });
  }

  generateDeclarations(pendingRequests: DeclarationRequestType[]) {
    if (pendingRequests.length === 0) {
      this.toast.info('Nenhuma declaração pendente para gerar.', 'Atenção');
      return;
    }

    this.declarationRequestService.clean();

    this.router.navigate(['/completed-declarations']);

    this.declarationRequestService.setTotalRequest(pendingRequests.length);

    pendingRequests.forEach((request, index) => {
      this.requestsService.generatePDF([request.id]).subscribe({
        next: (response) => {
          this.declarationRequestService.setGeneratedDeclarations(response);

          this.declarationRequestService.setCurrentRequest(index + 1);

          this.declarationRequestService.incrementSuccessCount();
        },
        error: () => {
          this.declarationRequestService.incrementErrorCount();

          this.declarationRequestService.setCurrentRequest(index + 1);
        },
        complete: () => {
          this.declarationRequestService.setCurrentRequest(index + 1);
        },
      });
    });
  }

  openFinalizeDeclarationConfirmDialog() {
    const processingRequests: DeclarationRequestType[] =
      this.selection.selected.filter(
        (request: DeclarationRequestType) => request.status === 'processing'
      );

    let dialogRef = this.dialog.open(FinalizeDeclarationConfirmComponent, {
      data: {
        requests: processingRequests,
      },
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.finalizeDeclarations(processingRequests);
      }
    });
  }

  finalizeDeclarations(processingRequests: DeclarationRequestType[]) {
    // TODO: Aqui falta a requisição de finalizar a solicitação
    this.toast.success(
      'Sua declaração foi finalizada com sucesso!',
      'Declaração Finalizada',
      5000
    );
  }
}
