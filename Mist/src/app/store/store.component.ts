import { Component, OnInit } from '@angular/core';
import { Game } from '../data/game';

@Component({
  selector: 'app-store',
  standalone: false,

  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent implements OnInit {
  games: Game[] = [
    {
      id: 1,
      title: 'Cyber Adventure',
      genre: 'Action',
      releaseYear: 2022,
      platform: ['Windows', 'Mac'],
      price: 19.99,
      rating: 4,
      discount: 0,
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/ACdzWZfdLaDdriwcnprmUV.jpg',
    },
    {
      id: 2,
      title: 'Fantasy Quest',
      genre: 'RPG',
      releaseYear: 2023,
      platform: ['Windows'],
      price: 29.99,
      discount: 10,
      rating: 5,
      imageUrl:
        'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/09/best-fantasy-games-elden-ring.jpg',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
