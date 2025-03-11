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
