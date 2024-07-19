import axios from 'axios';
import { environment } from '~/environment/config';
import { ScenePostRequest } from '~/model/scene-model';

export function getAllScenes() {
  return axios.get(`${environment.HOST_BACKEND}/scenes`);
}

export function createScene(scene: ScenePostRequest) {
  return axios.post(`${environment.HOST_BACKEND}/scenes`, scene);
}

export function deleteSceneById(id: number) {
  return axios.delete(`${environment.HOST_BACKEND}/scenes/${id}`);
}

export function patchScene(scene: { id: number; name: string; minutes: number; budget: number }) {
  return axios.patch(`${environment.HOST_BACKEND}/scenes`, scene);
}
