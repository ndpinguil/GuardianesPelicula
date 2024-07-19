import axios from 'axios';
import { environment } from '~/environment/config';
import { FilmContent, FilmGetResponse } from '~/model/film-model';

export function getAllFilms() {
  return axios.get<FilmGetResponse[]>(`${environment.HOST_BACKEND}/films`).then((res) => {
    return res;
  });
}

export function deleteFilmById(id: number) {
  return axios.delete(`${environment.HOST_BACKEND}/films/${id}`);
}

export function createFilm(film: FilmContent) {
  return axios.post(`${environment.HOST_BACKEND}/films`, film);
}

export function patchFilm(film: { id: number; name: string; minutes: number; director: string }) {
  return axios.patch(`${environment.HOST_BACKEND}/films`, film);
}
