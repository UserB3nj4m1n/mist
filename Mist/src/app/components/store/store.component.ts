import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Game } from '../../data/game';
import { Observable } from 'rxjs';
import { GetdataService } from '../../services/getdata.service';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { StoreCardComponent } from '../store-card/store-card.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  games$: Observable<Game[]>;
  games: Game[] = [];
  filteredGames: Game[] = [];
  genres$: Observable<{ name: string; count: number }[]>;
  genres: { name: string; count: number }[] = [];
  paginatedGames: Game[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isBrowser: boolean;
  isGridView: boolean = true;
  isAuthenticated: boolean = false;

  searchQuery: string = '';
  selPrice: number = 100;
  selectedRating: number[] = [];
  selectedCategories: string[] = [];
  selectedPlatforms: string[] = [];
  sortBy: string = 'default';
  ratingCounts: { [key: number]: number } = {};
  platformCounts: { [key: string]: number } = {};

  collapsedFilters: { [key: string]: boolean } = {
    search: false,
    price: false,
    categories: false,
    rating: false,
    platforms: false,
  };

  platforms$: Observable<{ abbreviation: string; count: number }[]>;
  platforms: { abbreviation: string; count: number }[] = [];
  ratings$: Observable<{ rating: number; count: number }[]>;
  ratings: { rating: number; count: number }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getDataService: GetdataService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.games$ = this.getDataService.getGames();
    this.genres$ = this.getDataService.getGenres();
    this.platforms$ = this.getDataService.getPlatforms();
    this.ratings$ = this.getDataService.getRatings();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.games$.subscribe((games) => {
      this.games = games;
      this.filteredGames = games;
      this.cdr.markForCheck();
      this.updatePagination();
    });
    this.genres$.subscribe((genres) => {
      this.genres = genres;
    });
    this.platforms$.subscribe((platforms) => {
      this.platforms = platforms;
    });
    this.ratings$.subscribe((ratings) => {
      this.ratings = ratings;
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

    this.paginatedGames = this.filteredGames.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredGames.length / this.itemsPerPage);
  }

  nextPage() {
    this.updatePagination(this.currentPage + 1);
  }

  prevPage() {
    this.updatePagination(this.currentPage - 1);
  }

  toggleRating(rating: number) {
    if (this.selectedRating.includes(rating)) {
      this.selectedRating = this.selectedRating.filter((r) => r !== rating);
    } else {
      this.selectedRating.push(rating);
    }
    this.applyFilters();
  }

  togglePlatform(abbreviation: string) {
    if (this.selectedPlatforms.includes(abbreviation)) {
      this.selectedPlatforms = this.selectedPlatforms.filter(
        (p) => p !== abbreviation
      );
    } else {
      this.selectedPlatforms.push(abbreviation);
    }
    this.applyFilters();
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category
      );
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredGames = this.games.filter((game) => {
      const matchesSearch =
        !this.searchQuery ||
        game.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesPrice = game.discountedPrice <= this.selPrice;
      const matchesRating =
        this.selectedRating.length === 0 ||
        (game.rating_star && this.selectedRating.includes(Math.floor(game.rating_star)));
      const matchesCategories =
        this.selectedCategories.length === 0 ||
        game.genres.some((genre) =>
          this.selectedCategories.includes(genre.name)
        );
      const matchesPlatform =
        this.selectedPlatforms.length === 0 ||
        game.platforms.some((platform) =>
          this.selectedPlatforms.includes(platform.abbreviation)
        );

      return (
        matchesSearch &&
        matchesPrice &&
        matchesRating &&
        matchesCategories &&
        matchesPlatform
      );
    });

    this.applySorting();
    this.updatePagination(1);
  }

  applySorting() {
    if (this.sortBy === 'priceLowHigh') {
      this.filteredGames.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (this.sortBy === 'priceHighLow') {
      this.filteredGames.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (this.sortBy === 'ratingHighLow') {
      this.filteredGames.sort((a, b) => b.rating_star - a.rating_star);
    }
  }

  toggleFilter(filter: string): void {
    this.collapsedFilters[filter] = !this.collapsedFilters[filter];
  }

  getToggleSymbol(filter: string): string {
    return this.collapsedFilters[filter] ? '▲' : '▼';
  }

  onSortChange() {
    this.applySorting();
    this.updatePagination(1);
  }
}
