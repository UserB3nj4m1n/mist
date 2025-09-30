import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';

@NgModule({
  declarations: [SlideshowComponent],
  imports: [CommonModule],
  exports: [SlideshowComponent],
})
export class SlideshowModule {}
