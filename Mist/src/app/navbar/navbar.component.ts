import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private renderer: Renderer2) {}

  setTheme(theme: string): void {
    if (theme === 'dark') {
      this.renderer.setAttribute(document.body, 'data-theme', 'dark');
    } else if (theme === 'light') {
      this.renderer.setAttribute(document.body, 'data-theme', 'light');
    }
  }
  

  isNavbarOpen = false;
  isDropdownOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
