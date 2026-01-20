import { Component, OnInit, OnDestroy } from '@angular/core';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    SelectButton,
    FormsModule,
    SkeletonModule,
    InputIcon,
    IconField,
    InputTextModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contacts: any[] = [];
  unsubscribe: any;
  sizes!: any[];
  selectedSize: any = undefined;

  ngOnInit() {
    const colRef = collection(db, 'contacts');
    this.unsubscribe = onSnapshot(colRef, (snapshot) => {
      this.contacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
    this.sizes = [
      { name: 'Small', value: 'small' },
      { name: 'Normal', value: undefined },
      { name: 'Large', value: 'large' },
    ];
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
