import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GetdataService } from '../../../../services/getdata.service';
import { Game } from '../../../../interface/game';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    SelectButton,
    FormsModule,
    SkeletonModule,
    InputIcon,
    IconField,
    InputTextModule,
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  games$: Observable<Game[]>;

  constructor(private getdata: GetdataService) {
    this.games$ = this.getdata.getGames();
  }

  editGame(game: any): void {
    console.log('Edit game:', game);
    // neskôr:
    // otvorenie dialogu
    // navigácia na edit page
  }
  sizes!: any[];

  selectedSize: any = undefined;

  ngOnInit() {
    this.sizes = [
      { name: 'Small', value: 'small' },
      { name: 'Normal', value: undefined },
      { name: 'Large', value: 'large' },
    ];
  }
}
