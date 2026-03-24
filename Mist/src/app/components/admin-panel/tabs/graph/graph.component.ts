import { Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphService } from '../../../../services/graph.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
  imports: [NgxChartsModule, CommonModule],
})
export class GraphComponent implements OnInit {
  single: any[] = [];
  view: [number, number] = [700, 400];

  genres: any[] = [];
  globalStats: any[] = [];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  showTooltip: boolean = false;

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.graphService.getGenreDistribution().subscribe((data) => {
      this.genres = data;
    });
    this.graphService.getGlobalStats().subscribe((data) => {
      this.globalStats = data;
    });
  }

  onSelect(data: { name: string; value: number }): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: { name: string; value: number }): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: { name: string; value: number }): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
