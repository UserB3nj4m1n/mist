import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../data/game';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private firestore: AngularFirestore) { }

  uploadGames(games: Game[]): void {
    const batch = this.firestore.firestore.batch();
    const gamesCollection = this.firestore.collection('games').ref;

    games.forEach(game => {
      const docRef = gamesCollection.doc(game.id.toString());
      batch.set(docRef, game);
    });

    batch.commit().then(() => {
      console.log('Games uploaded successfully!');
    }).catch(error => {
      console.error('Error uploading games: ', error);
    });
  }
}