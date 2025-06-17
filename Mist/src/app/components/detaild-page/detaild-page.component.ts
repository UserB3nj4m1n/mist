import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Game } from '../../data/game';
import { GetdataService } from '../../services/getdata.service';

@Component({
  standalone: false,
  selector: 'app-detaild-page',
  templateUrl: './detaild-page.component.html',
  styleUrls: ['./detaild-page.component.css'],
})
export class DetaildPageComponent implements OnInit {
  game: Game | undefined;
  slideshowImages: { url: string }[] = [];
  constructor(
    private route: ActivatedRoute,
    private getdataService: GetdataService
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

          this.slideshowImages = [
            { url: game.cover.url },
            ...game.screenshots,
          ];
        } else {
          console.error('Game not found or invalid ID.');
        }
      });
  }

  getStoreOffers() {
    const basePrice = this.game?.discountedPrice ?? 0;
    const storeData = [
      { name: 'Steam', logo: 'steam.png' },
      { name: 'Epic Games', logo: 'eg.png' },
      { name: 'GOG', logo: 'gog.png' },
      { name: 'Xbox', logo: 'xbox.png' },
      { name: 'PlayStation', logo: 'ps.png' },
    ];
    return storeData.map((store, i) => ({
      ...store,
      price: basePrice + i * 2,
    }));
  }
}
