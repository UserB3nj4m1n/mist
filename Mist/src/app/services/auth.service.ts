import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isBrowser() && !!localStorage.getItem('authToken')
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user?.emailVerified == true) {
          res.user.getIdToken().then((token) => {
            if (this.isBrowser()) {
              localStorage.setItem('authToken', token);
            }
            this.isAuthenticatedSubject.next(true); // Update authentication status
          });
          this.router.navigate(['/store']);
        } else {
          this.router.navigate(['/varify-email']);
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registration Successful');
        this.sendEmailForVarification(res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        if (this.isBrowser()) {
          localStorage.removeItem('authToken');
        }
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/varify-email']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/varify-email']);
      },
      (err: any) => {
        alert('Something went wrong. Not able to send mail to your email.');
      }
    );
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('authToken');
  }
}
