import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AppRoutingModule } from '../../app-routing.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  displayName: string = '';
  email: string = '';
  userProfile: any = null;

  constructor(private auth: AuthService, private userService: UserService) {}

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
}
