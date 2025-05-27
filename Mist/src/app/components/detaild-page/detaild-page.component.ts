import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detaild-page',
  standalone: false,
  templateUrl: './detaild-page.component.html',
  styleUrl: './detaild-page.component.css',
})
export class DetaildPageComponent {
  gameId: number;

  constructor(private route: ActivatedRoute) {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
  }
}