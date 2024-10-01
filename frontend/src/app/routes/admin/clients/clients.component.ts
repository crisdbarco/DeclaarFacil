import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu/menu.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {}
