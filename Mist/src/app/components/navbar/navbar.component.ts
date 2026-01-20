import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    Menubar,
    BadgeModule,
    AvatarModule,
    InputTextModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  cartItemCount: number = 0;
  showItemAddedAnimation: boolean = false;
  items: MenuItem[] | undefined;
  authStatusResolved: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) { }

  loadMenuItems(): void {
    const badgeValue =
      this.cartItemCount > 0 ? this.cartItemCount.toString() : undefined;

    this.items = [
      {
        label: 'Store',
        routerLink: '/store',
        icon: 'fa-solid fa-store',
      },
      {
        label: 'Library',
        routerLink: '/library',
        icon: 'fa-solid fa-book-open',
      },
      {
        label: 'Settings',
        routerLink: '/settings/account-profile',
        icon: 'fa-solid fa-gears',
      },
      {
        label: 'Admin',
        visible: this.isAdmin,
        icon: 'fa-brands fa-black-tie',
        items: [
          {
            label: 'Dashboard',
            routerLink: '/admin/dashboard',
            icon: 'fa-solid fa-chart-line',
          },
          {
            label: 'Users',
            routerLink: '/admin/users',
            icon: 'fa-solid fa-users',
          },
          {
            label: 'Games',
            routerLink: '/admin/games',
            icon: 'fa-solid fa-gamepad',
          },
          {
            label: 'Contacts',
            routerLink: '/admin/contacts',
            icon: 'fa-solid fa-phone',
          },
          {
            label: 'Graph',
            routerLink: '/admin/graph',
            icon: 'fa-solid fa-chart-column',
          },
        ],
      },
      {
        label: 'Cart',
        routerLink: '/cart',
        badge: badgeValue,
        icon: 'fa-solid fa-cart-shopping',
      },
    ];
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  goRegister() {
    this.router.navigate(['/login']);
  }

  goWelcome() {
    this.router.navigate(['/welcome']);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(first()).subscribe(status => {
      this.isAuthenticated = status;
      this.authStatusResolved = true;
    });

    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
    });

    this.authService.isAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
      this.loadMenuItems();
    });

    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
      this.loadMenuItems();
    });

    this.cartService.itemAdded.subscribe(() => {
      this.showItemAddedAnimation = true;
      setTimeout(() => {
        this.showItemAddedAnimation = false;
      }, 500);
    });
  }

  toggleTheme(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const theme = isChecked ? 'dark' : 'light';
  }

  logout(): void {
    this.authService.logout();
  }
}
