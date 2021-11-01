import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovie } from '../models/movie.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {
  public movie: IMovie[] = [];
  public favorite$: any = new BehaviorSubject([]);

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.API_KEY}`,
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getMovie(): Observable<IMovie[]> {
    return this.httpClient
      .get<IMovie[]>(`${environment.BASE_URL}/movie/popular`, this.httpOptions)
      .pipe(map((data: any) => data.results))
      .pipe(tap((movie) => (this.movie = movie)));
  }

  public getMovieById(movieId: number): Observable<IMovie> {
    return this.httpClient.get<IMovie>(
      `${environment.BASE_URL}/movie/${movieId}`,
      this.httpOptions
    );
  }

  addFavorite(id: number) {
    let index = this.movie.findIndex((el) => el.id === id);
    let movie = this.movie[index];
    this.getFavorite()
      .pipe(take(1))
      .subscribe((res) => {
        this.favorite$.next([...res, movie]);
      });
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
  searchMovie(term: string): Observable<IMovie[]> {
    return this.httpClient
      .get<IMovie[]>(
        `${environment.BASE_URL}/search/movie?query=${term}&language=uk`,
        this.httpOptions
      )
      .pipe(map((data: any) => data.results));
  }
}
