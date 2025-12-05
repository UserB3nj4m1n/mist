import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { db } from '../firebase.config';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  isAdmin$: Observable<boolean>;

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      this.isBrowser() && !!localStorage.getItem('authToken')
    );
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    this.isAdmin$ = this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user && user.email) {
          const userDocRef = doc(db, 'users', user.email);
          return from(getDoc(userDocRef)).pipe(
            map((docSnap) => {
              if (docSnap.exists()) {
                return docSnap.data()?.['role'] === 'admin';
              }
              return false;
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }

  isAdmin(): Observable<boolean> {
    return this.isAdmin$;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  createUserDataDocument(user: any, displayName?: string) {
    if (user && user.email) {
      const userDocRef = doc(db, 'users', user.email);
      const data: any = {
        email: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString(),
        role: 'user',
        realname: '',
        realsurname: '',
        address: '',
        phone: '',
        bio: '',
        photoURL: '',
      };
      if (displayName) {
        data.displayName = displayName;
      }
      setDoc(userDocRef, data);
    }
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
          Swal.fire({
            title: 'Email Not Verified',
            text: 'Please verify your email before logging in.',
            icon: 'warning',
            confirmButtonColor: '#6e8396',
          });
        }
      },
      (err) => {
        Swal.fire({
          title: 'Login Failed',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#6e8396',
        });
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
            this.createUserDataDocument(res.user, displayName);
          });
        } else {
          this.createUserDataDocument(res.user);
        }
        Swal.fire({
          title: 'Registration Successful',
          text: 'You have been registered successfully',
          icon: 'success',
          confirmButtonColor: '#6e8396',
        });
        this.sendEmailForVarification(res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        Swal.fire({
          title: 'Registration Failed',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#6e8396',
        });
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
        Swal.fire({
          title: 'Something went wrong',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#6e8396',
        });
      }
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/varify-email']);
      },
      (err) => {
        Swal.fire({
          title: 'Something went wrong',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#6e8396',
        });
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
        Swal.fire({
          title: 'Something went wrong',
          text: 'Not able to send mail to your email.',
          icon: 'error',
          confirmButtonColor: '#6e8396',
        });
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
