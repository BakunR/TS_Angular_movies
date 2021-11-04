import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMovie } from '../models/movie.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService {
  public movie: IMovie[] = [];

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

  searchMovie(term: string): Observable<IMovie[]> {
    return this.httpClient
      .get<IMovie[]>(
        `${environment.BASE_URL}/search/movie?query=${term}&language=uk`,
        this.httpOptions
      )
      .pipe(map((data: any) => data.results));
  }
}
