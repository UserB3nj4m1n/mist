import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Game } from '../../interface/game';
import { GetdataService } from '../../services/getdata.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SlideshowModule } from '../../models/slideshow/slideshow.module';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

import { TabsModule } from 'primeng/tabs';
import { GalleriaModule } from 'primeng/galleria'; // <-- 1. Import GalleriaModule
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { Chip } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

// Definícia typu pre obrázky v Gallerii
interface GameImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string; // Voliteľné, pre alt text
}

@Component({
  standalone: true,
  selector: 'app-detaild-page',
  templateUrl: './detaild-page.component.html',
  styleUrls: ['./detaild-page.component.css'],
  // 1. Pridanie GalleriaModule do imports
  imports: [
    CommonModule,
    MatTabsModule,
    SlideshowModule,
    TabsModule,
    GalleriaModule,
    DividerModule,
    ButtonModule,
    TagModule,
    Rating,
    FormsModule,
  ],
})
export class DetaildPageComponent implements OnInit {
  game: Game | undefined;
  slideshowImages: { url: string }[] = [];

  // 2. Nová premenná pre Galleria dáta
  images: GameImage[] = [];

  // 2. Konfigurácia pre responsiveOptions Galleria
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private getdataService: GetdataService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const idString = params.get('id');
          if (idString) {
            const gameId = Number(idString);
            if (!isNaN(gameId)) {
              return this.getdataService.getGameById(gameId);
            } else {
              console.error('Game ID from route is not a number:', idString);
              return of(undefined);
            }
          } else {
            console.error('No Game ID found in route parameters.');
            return of(undefined);
          }
        })
      )
      .subscribe((game) => {
        if (game) {
          this.game = game;
          this.slideshowImages = [{ url: game.cover.url }, ...game.screenshots];

          // 3. Transformácia dát pre Galleria
          this.images = this.slideshowImages.map((img) => ({
            itemImageSrc: img.url, // URL pre hlavný (väčší) obrázok
            thumbnailImageSrc: img.url, // URL pre miniatúru (možno budete chcieť použiť iný/menší obrázok)
            alt: this.game?.name
              ? `Screenshot of ${this.game.name}`
              : 'Game screenshot',
          }));
        } else {
          console.error('Game not found or invalid ID.');
        }
      });
  }
  // ... (zvyšok triedy, metódy getStoreOffers a addToCart zostávajú nezmenené)
  // ...
  getStoreOffers() {
    const basePrice = this.game?.discountedPrice ?? 0;
    const storeData = [
      {
        name: 'Steam',
        logo: 'steam.png',
        url: 'https://store.steampowered.com/',
      },
      {
        name: 'Epic Games',
        logo: 'eg.png',
        url: 'https://store.epicgames.com/',
      },
      { name: 'GOG', logo: 'gog.png', url: 'https://www.gog.com/' },
      {
        name: 'Xbox',
        logo: 'xbox.png',
        url: 'https://www.xbox.com/en-US/games/store',
      },
      {
        name: 'PlayStation',
        logo: 'ps.png',
        url: 'https://store.playstation.com/',
      },
    ];
    return storeData.map((store, i) => ({
      ...store,
      price: basePrice + i * 2,
    }));
  }

  addToCart() {
    if (this.game) {
      this.cartService.addToCart(this.game);
    }
  }
}
