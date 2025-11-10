import { Game } from './game';

export interface CartItem {
  id: string;
  game: Game;
  price: number;
  quantity: number;
}
