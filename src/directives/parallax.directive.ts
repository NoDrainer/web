import { Directive, AfterViewInit, ElementRef, Input, HostListener, Renderer } from '@angular/core';
declare var window:any;

@Directive({
  selector: '[parallax]',
})
export class ng2parallax implements AfterViewInit {
  @Input('speed') speed: number;
  @Input('initialPosY') initialPosY: number = 0;

  @HostListener('window:touchmove')
  touchmove() {
    this.execute();
  }

  @HostListener('window:scroll')
  scroll() {
    this.execute();
  }

  private element: HTMLElement;

  constructor(el: ElementRef, private renderer: Renderer) {
    this.element = el.nativeElement;
  }

  ngAfterViewInit() {
    this.execute();
  }

  private execute() {
    let scrollTop = (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : window(
        document.documentElement ||
        document.body.parentNode ||
        document.body
      ).scrollTop;
    
    let speed = (scrollTop / this.speed) * -1;

    let pos = speed === 0
      ? this.initialPosY + 'px'
      : (this.initialPosY + speed) + 'px';

    this.renderer.setElementStyle(this.element, 'backgroundPositionY', pos);
  }
}
