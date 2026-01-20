import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    FormsModule,
    CardModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    RouterModule,
    Toast,
  ],
  providers: [MessageService],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  displayName: string = '';

  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.displayName == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty Nickname',
        detail: 'Please enter a nickname',
        life: 3000,
      });
      return;
    }
    if (this.email == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty Email',
        detail: 'Please enter a valid email',
        life: 3000,
      });
      return;
    }

    if (this.password == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty Password',
        detail: 'Please enter a password',
        life: 3000,
      });
      return;
    }

    if (this.confirmPassword == '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Empty Confirm Password',
        detail: 'Please confirm your password',
        life: 3000,
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Password Mismatch',
        detail: 'Passwords do not match',
        life: 3000,
      });
      return;
    }

    this.auth.register(this.email, this.password, this.displayName);
  }
}
