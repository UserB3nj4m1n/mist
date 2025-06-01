// src/app/services/getdata.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Game, Genre } from '../data/game';

@Injectable({
  providedIn: 'root',
})
export class GetdataService {
  constructor(private firestore: AngularFirestore) {}

  getGames(): Observable<Game[]> {
    return this.firestore.collection<Game>('games').valueChanges();
  }

  getGameById(id: number): Observable<Game | undefined> {
    return this.firestore
      .collection<Game>('games', (ref) => ref.where('id', '==', id).limit(1))
      .valueChanges()
      .pipe(
        map((gamesArray: Game[]) =>
          gamesArray.length > 0 ? gamesArray[0] : undefined,
        ),
      );
  }

  getGenres(): Observable<{ name: string; count: number }[]> {
    return this.firestore.collection<Genre>('genres').valueChanges();
  }
}
