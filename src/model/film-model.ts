import { SceneGetResponse } from './scene-model';

export interface FilmContent {
  name: string;
  director: string;
  minutes: number;
}

export interface FilmGetResponse extends FilmContent {
  id: number;
  scenes: SceneGetResponse[];
}
