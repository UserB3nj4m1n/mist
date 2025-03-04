import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Game } from '../data/game';
import { Observable } from 'rxjs';
import { GetdataService } from '../services/getdata.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-store',
  standalone: false,

  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent implements OnInit {
  games$: Observable<Game[]>;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getDataService: GetdataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.games$ = this.getDataService.getGames();
  }

  ngOnInit(): void {}
}
