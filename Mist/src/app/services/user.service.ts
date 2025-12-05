import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fireauth: AngularFireAuth) {}

  getUserProfile(): Observable<any> {
    return this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user && user.email) {
          const userDocRef = doc(db, 'users', user.email);
          return from(getDoc(userDocRef)).pipe(
            map((docSnap) => (docSnap.exists() ? docSnap.data() : null))
          );
        } else {
          return of(null);
        }
      })
    );
  }
}
