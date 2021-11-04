import { Component, OnInit } from '@angular/core';
import { IMovie } from '../models/movie.interface';
import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  movies: IMovie[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favoriteService.getFavorite().subscribe((res) => {
      this.movies = res;
    });
  }

  delFavorite(id: number) {
    this.favoriteService.delFavorite(id);
  }
}
