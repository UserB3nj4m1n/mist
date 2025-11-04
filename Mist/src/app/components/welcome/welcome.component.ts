import {
  Component,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { Game } from '../../interface/game';
import { isPlatformBrowser } from '@angular/common';
import { GetdataService } from '../../services/getdata.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements AfterViewInit, OnDestroy {
  games$: Observable<Game[]>;
  topGames: Game[] = [];
  loading = true;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getDataService: GetdataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.games$ = this.getDataService.getGames();
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.games$.subscribe((games) => {
      this.topGames = [...games]
        .sort((a, b) => b.rating_star - a.rating_star)
        .slice(0, 4);
      this.loading = false;
    });
  }

  ngOnDestroy() {}
}
