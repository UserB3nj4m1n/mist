import { Component, Input } from '@angular/core';
import { Game } from '../../interface/game';
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

  platformIconMap: { [abbr: string]: string } = {
    'PC': 'fa-brands fa-windows',
    'PS4': 'fa-brands fa-playstation',
    'XONE': 'fa-brands fa-xbox',
    'Switch': 'fa-solid fa-gamepad',
    'Linux': 'fa-brands fa-linux',
    'Android': 'fa-brands fa-android',
    'iOS': 'fa-brands fa-apple',
  };
}
