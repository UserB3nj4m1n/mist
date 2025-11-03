import { Game } from './game';

export interface CartItem {
  game: Game;
  price: number;
  quantity: number;
  items: []
}
