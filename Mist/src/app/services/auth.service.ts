import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  private adminEmails = ['cenigamartin@gmail.com', 'dogiyo@protonmail.com'];

  isAdmin$: Observable<boolean>;

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      this.isBrowser() && !!localStorage.getItem('authToken')
    );
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    this.isAdmin$ = this.fireauth.authState.pipe(
      map((user) => !!user && this.adminEmails.includes(user.email ?? ''))
    );
  }

  isAdmin(): Observable<boolean> {
    return this.isAdmin$;
  }

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
            this.isAuthenticatedSubject.next(true);
          });
          this.router.navigate(['/store']);
        } else {
          alert('Please verify your email before logging in.');
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string, displayName?: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        if (displayName) {
          res.user?.updateProfile({ displayName }).then(() => {
            console.log('Display name updated:', displayName);
          });
        }
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

  getUserDetails() {
    return this.fireauth.currentUser;
  }

  getUserData(): Observable<any> {
    return this.fireauth.authState;
  }
}
