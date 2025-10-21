import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GetdataService } from '../../../../services/getdata.service';
import { Game } from '../../../../interface/game';

@Component({
  selector: 'app-games',
  standalone: false,

  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  games$: Observable<Game[]>;

  constructor(private getdata: GetdataService) {
    this.games$ = this.getdata.getGames();
  }
}
