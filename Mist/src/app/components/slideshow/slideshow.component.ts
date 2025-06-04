import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  standalone: false,

  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css',
})
export class SlideshowComponent {
  @Input() images: { url: string }[] = [];

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
