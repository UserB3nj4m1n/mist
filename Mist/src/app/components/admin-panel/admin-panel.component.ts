import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, RouterModule, Menu],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Dashboard',
          icon: 'fa-solid fa-chart-line',
          routerLink: '/admin/dashboard',
        },
        {
          label: 'Users',
          icon: 'fa-solid fa-users',
          routerLink: '/admin/users',
        },
        {
          label: 'Games',
          icon: 'fa-solid fa-gamepad',
          routerLink: '/admin/games',
        },
        {
          label: 'Contact',
          icon: 'fa-solid fa-envelope',
          routerLink: '/admin/contacts',
        },
        {
          label: 'Graphs',
          icon: 'fa-solid fa-chart-bar',
          routerLink: '/admin/graphs',
        },
      ],
    },
  ];
}
