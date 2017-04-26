import { Component, OnInit, HostListener } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('shrinkOnScroll', [
      state('small', style({ width: '81px' })),
      state('normal', style({ width: '120px' })),

      transition('* <=> *', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  private shrinkOn = 300;
  shrinkSubject = new Subject<string>();
  shrinkState$: Observable<string>;

  @HostListener('window:scroll')
  scroll() {
    let distanceY = window.pageYOffset || document.documentElement.scrollTop;
    this.shrinkSubject.next(distanceY < this.shrinkOn ? 'normal' : 'small');
  }

  constructor(private media: ObservableMedia) { }

  ngOnInit() {
    this.shrinkState$ = this.shrinkSubject
      .asObservable()
      .filter(x => this.media.isActive('gt-sm'))
      .distinctUntilChanged();
  }
}
