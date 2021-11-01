import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { IMovie } from '../models/movie.interface';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  public movie$: Observable<IMovie>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movie$ = this.movieService.getMovieById(id);
  }

  ngOnInit(): void {}
}
