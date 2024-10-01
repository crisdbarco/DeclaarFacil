import { Component } from '@angular/core';
import { MenuComponent } from '../../../core/layout/menu/menu.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {}
