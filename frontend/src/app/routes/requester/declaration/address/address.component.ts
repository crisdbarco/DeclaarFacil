import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../../components/menu/menu.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent {}
