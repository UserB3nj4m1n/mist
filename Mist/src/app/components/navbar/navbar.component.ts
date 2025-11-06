import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status: boolean) => {
      this.isAuthenticated = status;
    });
    this.authService.isAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  toggleTheme(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const theme = isChecked ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'data-theme', theme);
  }

  logout(): void {
    this.authService.logout();
  }
}
