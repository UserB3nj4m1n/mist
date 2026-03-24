import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private firestore: AngularFirestore) {}

  getGenreDistribution(): Observable<{ name: string; value: number }[]> {
    return this.firestore
      .collection('genres')
      .valueChanges()
      .pipe(
        map((genres: any[]) =>
          genres.map((g) => ({
            name: g.name,
            value: g.count || g.value || 0,
          })),
        ),
      );
  }
  getGlobalStats(): Observable<{ name: string; value: number }[]> {
    return this.firestore
      .collection('globalstats')
      .valueChanges()
      .pipe(
        map((items: any[]) =>
          items.map((item) => ({
            name: item.gameId?.toString() ?? 'unknown',
            value: Number(item.totalCount ?? 0),
          })),
        ),
      );
  }
}
