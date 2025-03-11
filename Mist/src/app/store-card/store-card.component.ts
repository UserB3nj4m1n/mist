import { Component, Input } from '@angular/core';
import { Game } from '../data/game';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css',
  imports: [NgIf],
})
export class StoreCardComponent {
  @Input() game!: Game;
}
