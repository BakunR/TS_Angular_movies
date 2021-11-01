import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  favoriteFilm(id: any) {
    const savedFilms = this.getSavedFilms();

    localStorage.setItem('savedFilms', JSON.stringify(savedFilms.concat(id)));
  }
  getSavedFilms() {
    return JSON.parse(localStorage.getItem('savedFilms') || '[]');
  }
}
