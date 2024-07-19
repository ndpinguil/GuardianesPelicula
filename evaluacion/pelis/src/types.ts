export type Film = {
    id: number;
    name: string;
    director: string;
    minutes: number;
  };
  
  export type Scene = {
    id: number;
    name: string;
    minutes: number;
    film_id: number;
    budget?: number;
  };
  
  export type Character = {
    id: number;
    name: string;
    scene_id: number;
    budget?: number;
  };
  