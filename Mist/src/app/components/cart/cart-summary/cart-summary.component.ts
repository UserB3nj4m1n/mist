import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  standalone: false,
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  cartTotal = 50;
  itemCount = 5;
}
