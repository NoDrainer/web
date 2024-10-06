import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
  input,
  numberAttribute,
} from '@angular/core';

function toNumber(val: string | number) {
  return numberAttribute(val);
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[parallax]',
  standalone: true,
})
// tslint:disable-next-line:directive-class-suffix
export class ParallaxDirective implements AfterViewInit {
  private element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  speed = input.required({ transform: toNumber });
  initialPosY = input(0, { transform: toNumber });

  @HostListener('window:touchmove')
  touchmove() {
    this.execute();
  }

  @HostListener('window:scroll')
  scroll() {
    this.execute();
  }

  ngAfterViewInit() {
    this.execute();
  }

  private execute() {
    const scrollTop = this.document.documentElement.scrollTop;

    const speed = (scrollTop / this.speed()) * -1;

    const pos =
      speed === 0 ? this.initialPosY + 'px' : this.initialPosY() + speed + 'px';

    this.renderer.setStyle(this.element, 'backgroundPositionY', pos);
  }
}
