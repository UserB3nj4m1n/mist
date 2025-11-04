import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Game } from '../../interface/game';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css',
  imports: [
    NgIf,
    CommonModule,
    RouterModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class StoreCardComponent {
  @Input() game!: Game;
  @Input() viewMode: string = 'grid';

  platformIconMap: { [abbr: string]: string } = {
    PC: 'fa-brands fa-windows',
    PS4: 'fa-brands fa-playstation',
    XONE: 'fa-brands fa-xbox',
    Switch: 'fa-solid fa-gamepad',
    Linux: 'fa-brands fa-linux',
    Android: 'fa-brands fa-android',
    iOS: 'fa-brands fa-apple',
  };
  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
