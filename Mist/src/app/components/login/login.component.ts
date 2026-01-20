import { Component, Inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    RouterModule,
  ],
})
export class LoginComponent {
  checked1 = signal<boolean>(true);
  email: string = '';
  password: string = '';

  constructor(@Inject(AuthService) private auth: AuthService) {}

  ngOnInit(): void {}

  login() {
    if (this.email == '') {
      Swal.fire({
        title: 'Empty Email',
        text: 'Please enter a valid email',
        icon: 'error',
        confirmButtonColor: '#6e8396',
      });
      return;
    }
    if (this.password == '') {
      Swal.fire({
        title: 'Empty Password',
        text: 'Please enter your password',
        icon: 'error',
        confirmButtonColor: '#6e8396',
      });

      return;
    }

    this.auth.login(this.email, this.password);
  }
}
