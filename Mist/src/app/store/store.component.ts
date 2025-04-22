import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Game } from '../data/game';
import { Observable } from 'rxjs';
import { GetdataService } from '../services/getdata.service';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { StoreCardComponent } from '../store-card/store-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    StoreCardComponent,
    CommonModule,
  ],
})
export class StoreComponent implements OnInit {
  games$: Observable<Game[]>; // Observable of games
  games: Game[] = []; // Resolved games array
  paginatedGames: Game[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isBrowser: boolean;
  isGridView: boolean = true;
  isAuthenticated: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getDataService: GetdataService,
    private authService: AuthService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.games$ = this.getDataService.getGames();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.games$.subscribe((games) => {
      this.games = games;
      this.updatePagination();
    });
  }

  toggleView(mode: string) {
    this.isGridView = mode === 'grid';
  }

  updatePagination(page: number = this.currentPage) {
    if (page < 1) {
      page = 1;
    }
    if (page > this.totalPages) {
      page = this.totalPages;
    }
    this.currentPage = page;

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedGames = this.games.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.games.length / this.itemsPerPage);
  }

  nextPage() {
    this.updatePagination(this.currentPage + 1);
  }

  prevPage() {
    this.updatePagination(this.currentPage - 1);
  }
}
