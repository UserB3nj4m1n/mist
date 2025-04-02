import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private renderer: Renderer2) {}

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
}
