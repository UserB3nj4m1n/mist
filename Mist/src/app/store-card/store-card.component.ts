import { Component, Input } from '@angular/core';
import { Game } from '../data/game';


@Component({
  selector: 'app-store-card',
  standalone: false,
  
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css'
})
export class StoreCardComponent {
  @Input() game!: Game;
}