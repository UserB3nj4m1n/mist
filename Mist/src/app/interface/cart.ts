import { Game } from './game';

export interface CartItem {
  id: string;
  quantity: number;
  game?: Game;
}
