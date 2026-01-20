import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../interface/cart';
import Swal from 'sweetalert2';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css',
  imports: [CardModule, CommonModule, FormsModule, ButtonModule, DividerModule],
})
export class CartItemsComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

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

  checkout(): void {
    Swal.fire({
      title: 'Success!',
      text: 'You have successfully checked out.',
      icon: 'success',
      confirmButtonColor: '#6e8396',
    });
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
