import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { IMovie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favorite$: any = new BehaviorSubject([]);

  constructor() {}

  addFavorite(movie: IMovie) {
    this.getFavorite()
      .pipe(
        take(1),
        filter((res) => res.findIndex((el) => el.id === movie.id) === -1),
        tap((res) => this.favorite$.next([...res, movie]))
      )
      .subscribe();
  }

  getFavorite(): Observable<IMovie[]> {
    return this.favorite$;
  }

  delFavorite(id: number) {
    this.getFavorite()
      .pipe(take(1))
      .subscribe((res) => {
        let index = res.findIndex((el) => el.id === id);
        console.log('res', res);

        console.log(res[index]);
        let newItems = res.splice(index, -1);
        this.favorite$.next([newItems]);
      });
  }
}
