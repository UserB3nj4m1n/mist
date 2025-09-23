import { Component, OnInit, OnDestroy } from '@angular/core';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase.config';

@Component({
  selector: 'app-contact',
  standalone: false,

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contacts: any[] = [];
  unsubscribe: any;

  ngOnInit() {
    const colRef = collection(db, 'contacts');
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      this.contacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
