import { Component } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  standalone: false,

  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css',
})
export class SlideshowComponent {
  images = [
    {
      src: '/_5fa369d9-47e1-427c-9f0a-8ba03754dde4.jpg',
      thumb: '/_5fa369d9-47e1-427c-9f0a-8ba03754dde4.jpg',
    },
    {
      src: '/_f02578d2-23a5-4134-8551-28585b87d396.jpg',
      thumb: '/_f02578d2-23a5-4134-8551-28585b87d396.jpg',
    },
    {
      src: '/_75b1e595-87e4-4e52-b15a-132c66e051ae.jpg',
      thumb: '/_75b1e595-87e4-4e52-b15a-132c66e051ae.jpg',
    },
    {
      src: '/_f02578d2-23a5-4134-8551-28585b87d396.jpg',
      thumb: '/_f02578d2-23a5-4134-8551-28585b87d396.jpg',
    },
    {
      src: '/_5fa369d9-47e1-427c-9f0a-8ba03754dde4.jpg',
      thumb: '/_5fa369d9-47e1-427c-9f0a-8ba03754dde4.jpg',
    },
  ];

  slideIndex = 0;

  nextSlide() {
    this.slideIndex = (this.slideIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.slideIndex =
      (this.slideIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.slideIndex = index;
  }
}
