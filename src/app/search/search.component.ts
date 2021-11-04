import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FavoriteService } from '../favorite/favorite.service';
import { IMovie } from '../models/movie.interface';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  movie$: Observable<IMovie[]>;
  private searchTerms = new Subject<any>();
  public loading = false;

  constructor(
    private movieService: MovieService,
    private favoriteService: FavoriteService
  ) {
    this.movie$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovie(term))
    );
  }
  saveFilm(movie: IMovie) {
    this.favoriteService.addFavorite(movie);
    console.log('click');
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {}
}
