import { Component, HostListener } from '@angular/core';
import { DeclarationRequestType } from '../../../shared/domain/requests.type';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DeclarationRequestService } from '../../../shared/services/declaration-request.service';

@Component({
  selector: 'app-completed-declarations',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './completed-declarations.component.html',
  styleUrl: './completed-declarations.component.css',
})
export class CompletedDeclarationsComponent {
  declarations: DeclarationRequestType[] = [];

  constructor(private declarationRequestService: DeclarationRequestService) {}

  ngOnInit() {
    this.declarations =
      this.declarationRequestService.getGeneratedDeclarations();
  }

  downloadFile(url?: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    return true;
  }
}
