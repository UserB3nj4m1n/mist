import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private auth: AuthService) {}
  ngOnInit(): void {}
  login() {
    if (this.email == '') {
      alert('Please enter your email');
    }
    if (this.password == '') {
      alert('Please enter your password');
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
