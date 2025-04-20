import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Import your AuthService

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status: boolean) => {
      this.isAuthenticated = status;
    });
  }

  toggleTheme(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const theme = isChecked ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'data-theme', theme);
  }

  isNavbarOpen = false;
  isDropdownOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
