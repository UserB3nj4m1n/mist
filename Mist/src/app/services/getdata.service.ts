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

  getGenres(): Observable<{ name: string; count: number }[]> {
    return this.firestore.collection<Genre>('genres').valueChanges();
  }
}
