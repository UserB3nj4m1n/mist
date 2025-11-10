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

@Component({
  standalone: true,
  selector: 'app-detaild-page',
  templateUrl: './detaild-page.component.html',
  styleUrls: ['./detaild-page.component.css'],
  imports: [CommonModule, MatTabsModule, SlideshowModule],
})
export class DetaildPageComponent implements OnInit {
  game: Game | undefined;
  slideshowImages: { url: string }[] = [];

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
        } else {
          console.error('Game not found or invalid ID.');
        }
      });
  }

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
