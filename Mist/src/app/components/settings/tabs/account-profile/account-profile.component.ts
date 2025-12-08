import { Component, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { User } from '../../../../interface/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AccountProfileComponent {
  userProfile: User = {
    email: '',
    realname: '',
    realsurname: '',
    phone: '',
    bio: '',
    displayName: '',
    photoURL: '',
  };
  showInput = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  saveProfile() {
    this.updateInfo();
    this.showInput = false;
  }

  cancelProfile() {
    this.loadProfile();
    this.showInput = false;
  }

  toggleInput() {
    this.showInput = !this.showInput;
  }

  loadProfile() {
    this.userService.getUserProfile().subscribe((data) => {
      this.userProfile = data;
    });
  }

  async updateInfo() {
    if (!this.userProfile?.email) return;

    try {
      const userDocRef = doc(db, 'users', this.userProfile.email);
      await updateDoc(userDocRef, {
        realname: this.userProfile.realname,
        realsurname: this.userProfile.realsurname,
        phone: this.userProfile.phone,
        bio: this.userProfile.bio,
        displayName: this.userProfile.displayName,
        photoURL: this.userProfile.photoURL,
      });
    } catch (err) {
      console.error('Error updating realname:', err);
    }
  }
}
