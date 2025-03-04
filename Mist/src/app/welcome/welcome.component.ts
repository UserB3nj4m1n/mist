import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { Game } from '../data/game';
import { isPlatformBrowser } from '@angular/common';
import { GetdataService } from '../services/getdata.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-welcome',
  standalone: false,
  
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements AfterViewInit, OnDestroy {
  games$: Observable<Game[]>;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getDataService: GetdataService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.games$ = this.getDataService.getGames();
  }
  
  currentSlide = 0;
  slideInterval: any;

  ngAfterViewInit() {
    if (!this.isBrowser) return; // Ensure it's only executed in the browser
  
    this.showSlide(this.currentSlide);
  
    document.getElementById('prev')?.addEventListener('click', () => {
      this.changeSlide(-1);
    });
  
    document.getElementById('next')?.addEventListener('click', () => {
      this.changeSlide(1);
    });
  
    this.slideInterval = setInterval(() => {
      this.changeSlide(1);
    }, 2000);
  }
  

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  changeSlide(n: number) {
    this.currentSlide += n;
    this.showSlide(this.currentSlide);
  }

  showSlide(n: number) {
    if (!this.isBrowser) return; // Prevents execution on the server
  
    const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
    if (n >= slides.length) { this.currentSlide = 0; }
    if (n < 0) { this.currentSlide = slides.length - 1; }
  
    const offset = -this.currentSlide * 10;
    const slider = document.getElementById('slider') as HTMLElement;
    if (slider) {
      slider.style.transform = `translateX(${offset}%)`;
    }
  }
  
  
}  