import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-items',
  standalone: false,
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css',
})
export class CartItemsComponent implements OnInit {
  cartItems: any[] = [];

  ngOnInit(): void {
    this.cartItems = [
      {
        game: {
          id: '1',
          title: 'Mock Game 1',
          description: 'Description for Mock Game 1',
          price: 59.99,
          releaseDate: new Date(),
          genre: 'Action',
          developer: 'MockDev',
          publisher: 'MockPub',
          platform: ['PC'],
          image: 'https://via.placeholder.com/150',
          rating: 4.5,
          reviews: 100,
          systemRequirements: {
            os: 'Windows 10',
            processor: 'Intel i5',
            memory: '8GB',
            graphics: 'NVIDIA GTX 1060',
            storage: '50GB',
          },
          trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          screenshot: ['https://via.placeholder.com/300'],
          tags: ['mock', 'game'],
          isFeatured: true,
          discount: 0,
        },
        price: 59.99,
        quantity: 1,
        items: [],
      },
      {
        game: {
          id: '2',
          title: 'Mock Game 2',
          description: 'Description for Mock Game 2',
          price: 39.99,
          releaseDate: new Date(),
          genre: 'Adventure',
          developer: 'MockDev2',
          publisher: 'MockPub2',
          platform: ['PS5'],
          image: 'https://via.placeholder.com/150',
          rating: 4.0,
          reviews: 50,
          systemRequirements: {
            os: 'Windows 10',
            processor: 'Intel i5',
            memory: '8GB',
            graphics: 'NVIDIA GTX 1060',
            storage: '50GB',
          },
          trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          screenshot: ['https://via.placeholder.com/300'],
          tags: ['mock', 'game'],
          isFeatured: false,
          discount: 0,
        },
        price: 39.99,
        quantity: 2,
        items: [],
      },
    ];
  }

  checkout(): void {
    console.log('Checkout clicked!');
    // Implement checkout logic here
    alert('Proceeding to checkout!');
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}
