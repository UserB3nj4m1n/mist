import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Game } from '../../data/game';
import { GetdataService } from '../../services/getdata.service';

@Component({
  selector: 'app-detaild-page',
  standalone: false,
  templateUrl: './detaild-page.component.html',
  styleUrl: './detaild-page.component.css'
})
export class DetaildPageComponent implements OnInit {
  game$: Observable<Game | undefined>;

  constructor(
    private route: ActivatedRoute,
    private getdataService: GetdataService
  ) {
    this.game$ = of(undefined);
  }

  ngOnInit(): void {
    this.game$ = this.route.paramMap.pipe(
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
    );
  }

  getRatingStars(rating: number | undefined): string {
    if (rating === undefined) {
      return '';
    }
    const validatedRating = Math.max(0, Math.min(5, Math.round(rating)));
    return '⭐'.repeat(validatedRating);
  }
}
