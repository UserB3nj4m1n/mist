import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  displayName: string = '';
  email: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUserData().subscribe((user) => {
      if (user) {
        this.displayName = user.displayName || 'No Display Name';
        this.email = user.email || 'No Email';
      }
    });
  }
}
