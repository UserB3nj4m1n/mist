import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Game } from '../data/game';

@Component({
  selector: 'app-welcome',
  standalone: false,
  
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements AfterViewInit, OnDestroy {
  games: Game[] = [
    {
      id: 1,
      title: 'Cyber Adventure',
      genre: 'Action',
      releaseYear: 2022,
      platform: ['Windows', 'Mac'],
      price: 19.99,
      rating: 4,
      discount: 0,
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/ACdzWZfdLaDdriwcnprmUV.jpg',
    },
    {
      id: 2,
      title: 'Fantasy Quest',
      genre: 'RPG',
      releaseYear: 2023,
      platform: ['Windows'],
      price: 29.99,
      discount: 10,
      rating: 5,
      imageUrl:
        'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/09/best-fantasy-games-elden-ring.jpg',
    },
    {
      id: 3,
      title: 'Space Shooter',
      genre: 'Shooter',
      releaseYear: 2024,
      platform: ['Windows', 'Linux'],
      price: 9.99,
      discount: 20,
      rating: 3,
      imageUrl:
        'https://play-lh.googleusercontent.com/NwGdwj6SSKss7V7TuFFqJDYMQ7E0JKYt5pLWMl_YuQOaTT6KseSvD2vi4buKtGlh=w526-h296-rw',
    },
    {
      id: 4,
      title: 'Medieval Strategy',
      genre: 'Strategy',
      releaseYear: 2025,
      platform: ['Windows', 'Mac', 'Linux'],
      price: 39.99,
      discount: 15,
      rating: 4,
      imageUrl:
        'https://i.ytimg.com/vi/U_X3sEyeWv0/maxresdefault.jpg',
    }
  ];
  
  currentSlide = 0;
  slideInterval: any;

  ngAfterViewInit() {
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
    const slides = document.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>;
    if (n >= slides.length) { this.currentSlide = 0; }
    if (n < 0) { this.currentSlide = slides.length - 1; }
    const offset = -this.currentSlide * 10;
    const slider = document.getElementById('slider') as HTMLElement;
    slider.style.transform = `translateX(${offset}%)`;
  }
}