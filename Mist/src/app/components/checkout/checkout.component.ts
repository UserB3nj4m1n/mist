import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interface/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  imports: [
    CardModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    DividerModule,
  ],
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      postCode: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });

    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Form Submitted!', this.checkoutForm.value);
      // Process payment or whatever is next
    }
  }

  cartItems: CartItem[] = [];

  removeFromCart(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.updateCartItemQuantity(
      item.id.toString(),
      item.quantity + 1,
    );
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateCartItemQuantity(
      item.id.toString(),
      item.quantity - 1,
    );
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (acc, item) =>
        acc +
        (item.game
          ? (item.game.discountedPrice || item.game.originalPrice) *
            item.quantity
          : 0),
      0,
    );
  }
}
