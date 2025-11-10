import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
