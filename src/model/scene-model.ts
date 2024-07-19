import { CharacterGetResponse } from './character-mode';

export interface SceneContent {
  name: string;
  minutes: number;
  budget: number;
}

export interface SceneGetResponse extends SceneContent {
  id: number;
  characters: CharacterGetResponse[];
}

export interface ScenePostRequest extends SceneContent {
  film: {
    id: number;
  };
}
