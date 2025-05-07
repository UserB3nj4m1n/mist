import { Component, Input } from '@angular/core';
import { Game } from '../../data/game';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css',
  imports: [NgIf, CommonModule],
})
export class StoreCardComponent {
  @Input() game!: Game;
}
