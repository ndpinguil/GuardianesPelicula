export interface CharacterContent {
  name: string;
  budget: number;
}

export interface CharacterGetResponse extends CharacterContent {
  id: number;
}

export interface CharacterPostRequest extends CharacterContent {
  scene: {
    id: number;
  };
}
