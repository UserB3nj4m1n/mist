import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  displayName: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.displayName == '') {
      Swal.fire({
        title: 'Empty Name',
        text: 'Please enter a valid name',
        icon: 'error',
        confirmButtonColor: '#6e8396',
      });
      return;
    }
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
        text: 'Please enter a password',
        icon: 'error',
        confirmButtonColor: '#6e8396',
      });
      return;
    }

    if (this.confirmPassword == '') {
      Swal.fire({
        title: 'Empty Confirm Password',
        text: 'Please confirm your password',
        icon: 'error',
        confirmButtonColor: '#6e8396',
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Passwords do not match',
        icon: 'error',
        confirmButtonColor: '#6e8396',
      });
      return;
    }

    this.auth.register(this.email, this.password, this.displayName);
  }
}
