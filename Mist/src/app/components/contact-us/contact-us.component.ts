import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

@Component({
  selector: 'app-contact-us',
  standalone: false,

  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      try {
        const docRef = await addDoc(collection(db, 'contacts'), {
          name: this.contactForm.value.name,
          surname: this.contactForm.value.surname,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message,
          date: new Date(),
        });
        this.contactForm.reset();
        alert('Message sent successfully!');
      } catch (e) {
        console.error('Error adding document: ', e);
        alert('Error sending message. Please try again.');
      }
    }
  }
}
