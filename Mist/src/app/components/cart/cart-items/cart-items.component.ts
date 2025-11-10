import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../interface/cart';

@Component({
  selector: 'app-cart-items',
  standalone: false,
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css',
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
    this.cartService.updateCartItemQuantity(item.id.toString(), item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.updateCartItemQuantity(item.id.toString(), item.quantity - 1);
  }

  checkout(): void {
    console.log('Checkout clicked!');
    // Checkout to be added
    alert('Proceeding to checkout!');
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
