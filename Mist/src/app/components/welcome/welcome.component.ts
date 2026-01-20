import {
  Component,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Game } from '../../interface/game';
import { isPlatformBrowser } from '@angular/common';
import { GetdataService } from '../../services/getdata.service';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [ButtonModule, FormsModule, CommonModule, MatIconModule, CardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomeComponent implements AfterViewInit, OnDestroy {
  games$: Observable<Game[]>;
  topGames: Game[] = [];
  loading = true;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getDataService: GetdataService,
    private router: Router
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

  goStore() {
    this.router.navigate(['/store']);
  }
}
