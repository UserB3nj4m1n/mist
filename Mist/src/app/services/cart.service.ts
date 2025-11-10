import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { CartItem } from '../interface/cart';
import { Game } from '../interface/game';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemAdded$ = new BehaviorSubject<void>(undefined);

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  get itemAdded(): Observable<void> {
    return this.itemAdded$.asObservable();
  }

  addToCart(game: Game) {
    this.authService.getUserData().subscribe((user) => {
      if (user && user.email) {
        const cartItemRef = this.afs
          .collection(`users/${user.email}/cart`)
          .doc(game.id.toString());
        cartItemRef.get().subscribe((doc) => {
          if (doc.exists) {
            // @ts-ignore
            const currentQuantity = doc.data()['quantity'] + 1;
            cartItemRef.update({ quantity: currentQuantity });
          } else {
            const newItem: CartItem = {
              game: game,
              price: game.discountedPrice || game.originalPrice,
              quantity: 1,
              id: game.id.toString(),
            };
            cartItemRef.set(newItem);
          }
          this.itemAdded$.next();
        });
      } else {
        alert('Please log in to add items to your cart.');
      }
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.authService.getUserData().pipe(
      switchMap((user) => {
        if (user && user.email) {
          return this.afs
            .collection<CartItem>(`users/${user.email}/cart`)
            .valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  getCartItemCount(): Observable<number> {
    return this.getCartItems().pipe(
      map(items => items.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

  removeFromCart(itemId: string) {
    this.authService.getUserData().subscribe((user) => {
      if (user && user.email) {
        this.afs.collection(`users/${user.email}/cart`).doc(itemId).delete();
      }
    });
  }

  updateCartItemQuantity(itemId: string, quantity: number) {
    this.authService.getUserData().subscribe((user) => {
      if (user && user.email) {
        if (quantity > 0) {
          this.afs
            .collection(`users/${user.email}/cart`)
            .doc(itemId)
            .update({ quantity });
        } else {
          this.removeFromCart(itemId);
        }
      }
    });
  }
}
