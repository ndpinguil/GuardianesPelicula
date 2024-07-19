import axios from 'axios';
import { environment } from '~/environment/config';
import { CharacterPostRequest } from '~/model/character-mode';

export function createCharacter(character: CharacterPostRequest) {
  return axios.post(`${environment.HOST_BACKEND}/characters`, character);
}

export function deleteCharacterById(id: number) {
  return axios.delete(`${environment.HOST_BACKEND}/characters/${id}`);
}

export function patchCharacter(character: { id: number; name: string; budget: number }) {
  return axios.patch(`${environment.HOST_BACKEND}/characters`, character);
}
