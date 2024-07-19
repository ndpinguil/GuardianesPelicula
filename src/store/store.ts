import { create } from 'zustand';
import { CharacterGetResponse } from '~/model/character-mode';
import { SceneGetResponse } from '~/model/scene-model';

interface AppStore {
  currentFilmId: number;
  setCurrentFilmId: (id: number) => void;
  scenes: SceneGetResponse[];
  setCurrentScenes: (scenes: SceneGetResponse[]) => void;
  currentSceneId: number;
  setCurrentSceneId: (id: number) => void;
  currentCharacters: CharacterGetResponse[];
  setCurrentCharacters: (characters: CharacterGetResponse[]) => void;
  director: string;
  setDirector: (director: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
  currentFilmId: 0,
  setCurrentFilmId: (id) => {
    set({ currentFilmId: id });
  },
  scenes: [],
  setCurrentScenes: (scenes) => {
    set({ scenes });
  },
  currentSceneId: 0,
  setCurrentSceneId: (id) => {
    set({ currentSceneId: id });
  },
  currentCharacters: [],
  setCurrentCharacters: (characters) => {
    set({ currentCharacters: characters });
  },
  director: '',
  setDirector: (director) => {
    set({ director });
  },
}));

export default useAppStore;
