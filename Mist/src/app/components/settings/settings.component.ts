import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  imports: [FormsModule, RouterModule, Menu, DividerModule],
})
export class SettingsComponent {
  items: MenuItem[] = [
    {
      label: 'Settings',
      items: [
        {
          label: 'Profile',
          icon: 'fa-solid fa-user',
          routerLink: 'account-profile',
        },
        {
          label: 'My Orders',
          icon: 'fa-solid fa-box-open',
          routerLink: '/settings/orders',
        },
        {
          label: 'Payment Info',
          icon: 'fa-solid fa-credit-card',
          routerLink: '/settings/payments',
        },
        {
          label: 'Support',
          icon: 'fa-solid fa-envelope',
          routerLink: '/admin/contacts',
        },
        {
          label: 'Settings',
          icon: 'fa-solid fa-gears',
          routerLink: '/settings/settings-tab',
        },
      ],
    },
  ];
}
