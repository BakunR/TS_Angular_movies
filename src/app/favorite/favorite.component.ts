import { Component, OnInit } from '@angular/core';
import { IMovie } from '../models/movie.interface';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  movies: IMovie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getFavorite().subscribe((res) => {
      this.movies = res;
    });
  }

  delFavorite(id: number) {
    this.movieService.delFavorite(id);
  }
}
