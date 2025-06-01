import { Component, Input } from '@angular/core';
import { Game } from '../../data/game';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css',
  imports: [NgIf, CommonModule, RouterModule],
})
export class StoreCardComponent {
  @Input() game!: Game;
  @Input() viewMode: string = 'grid';
}
