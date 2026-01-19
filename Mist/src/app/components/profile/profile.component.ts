import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AppRoutingModule } from '../../app-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CardModule, ButtonModule],
})
export class ProfileComponent implements OnInit {
  displayName: string = '';
  email: string = '';
  userProfile: any = null;

  constructor(
    private auth: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.auth.getUserData().subscribe((user) => {
      if (user) {
        this.displayName = user.displayName || 'No Display Name';
        this.email = user.email || 'No Email';
      }
    });

    this.userService.getUserProfile().subscribe((data) => {
      this.userProfile = data;
    });
  }
  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }
}
