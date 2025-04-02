import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Game } from '../data/game';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor(private firestore: AngularFirestore) { }

  getGames(): Observable<Game[]> {
    return this.firestore.collection<Game>('games').valueChanges();
  }
}