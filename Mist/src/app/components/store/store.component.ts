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
  loading: boolean = true;

  searchQuery: string = '';
  selPrice: number = 100;
  selectedCategories: string[] = [];
  selectedCategoriesMap: { [key: string]: boolean } = {};

  selectedRatings: number[] = [];
  selectedRatingsMap: { [key: number]: boolean } = {};

  selectedPlatforms: string[] = [];
  selectedPlatformsMap: { [key: string]: boolean } = {};
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
    this.loading = true;
    this.games$.subscribe((games) => {
      this.games = games;
      this.filteredGames = games;
      this.cdr.markForCheck();
      this.updatePagination();
      this.loading = false;
    });
    this.genres$.subscribe((genres) => {
      this.genres = genres;
      // Initialize map for genres
      this.selectedCategoriesMap = {};
      genres.forEach(g => this.selectedCategoriesMap[g.name] = false);
    });
    this.platforms$.subscribe((platforms) => {
      this.platforms = platforms;
      // Initialize map for platforms
      this.selectedPlatformsMap = {};
      platforms.forEach(p => this.selectedPlatformsMap[p.abbreviation] = false);
    });
    this.ratings$.subscribe((ratings) => {
      this.ratings = ratings;
      // Initialize map for ratings
      this.selectedRatingsMap = {};
      ratings.forEach(r => this.selectedRatingsMap[r.rating] = false);
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

  onCategoryChange(category: string, checked: boolean) {
    if (checked) {
      if (!this.selectedCategories.includes(category)) {
        this.selectedCategories.push(category);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.applyFilters();
  }

  onPlatformChange(platform: string, checked: boolean) {
    if (checked) {
      if (!this.selectedPlatforms.includes(platform)) {
        this.selectedPlatforms.push(platform);
      }
    } else {
      this.selectedPlatforms = this.selectedPlatforms.filter(p => p !== platform);
    }
    this.applyFilters();
  }

  onRatingChange(rating: number, checked: boolean) {
    if (checked) {
      if (!this.selectedRatings.includes(rating)) {
        this.selectedRatings.push(rating);
      }
    } else {
      this.selectedRatings = this.selectedRatings.filter(r => r !== rating);
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
        this.selectedRatings.length === 0 ||
        (game.rating_star !== undefined && this.selectedRatings.includes(game.rating_star));
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
    } else if (this.sortBy === 'ratingLowHigh') {
      this.filteredGames.sort((a, b) => a.rating_star - b.rating_star);
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
