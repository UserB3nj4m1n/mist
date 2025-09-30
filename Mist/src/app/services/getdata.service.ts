// src/app/services/getdata.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';
import { Game, Genre } from '../data/game';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GetdataService {
  private isBrowser: boolean;

  constructor(
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getGames(): Observable<Game[]> {
    if (!this.isBrowser) return of([]);
    return this.firestore.collection<Game>('games').valueChanges();
  }

  getGameById(id: number): Observable<Game | undefined> {
    if (!this.isBrowser) return of(undefined);
    return this.firestore
      .collection<Game>('games', (ref) => ref.where('id', '==', id).limit(1))
      .valueChanges()
      .pipe(
        map((gamesArray: Game[]) =>
          gamesArray.length > 0 ? gamesArray[0] : undefined
        )
      );
  }

  getGenres(): Observable<{ name: string; count: number }[]> {
    if (!this.isBrowser) return of([]);
    return this.firestore.collection<Genre>('genres').valueChanges();
  }

  getPlatforms(): Observable<{ abbreviation: string; count: number }[]> {
    if (!this.isBrowser) return of([]);
    return this.firestore
      .collection<{ abbreviation: string; count: number }>('platforms')
      .valueChanges();
  }

  getRatings(): Observable<{ rating: number; count: number }[]> {
    if (!this.isBrowser) return of([]);
    return this.firestore
      .collection<{ rating: number; count: number }>('ratings')
      .valueChanges();
  }
}
