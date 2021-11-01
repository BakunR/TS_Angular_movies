import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../models/movie.interface';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public loading = false;
  public obs2$: Observable<IMovie[]>;

  constructor(
    public movieService: MovieService,
    public storageService: StorageService
  ) {
    this.obs2$ = this.movieService.getMovie();
    console.log('result', this.obs2$);
  }

  ngOnInit(): void {}

  saveFilm(id: number) {
    this.movieService.addFavorite(id);
  }
}
