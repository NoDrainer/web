import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { ObservableMedia } from '@angular/flex-layout';
import { Angulartics2GoogleAnalytics, Angulartics2 } from 'angulartics2';
import { environment } from '../environments/environment';
import { ScrollToService } from '../services/scrollTo';
import { Observable } from 'rxjs/Observable';

export function firstLoad(from, to) { return from == null; }

@Component({
  selector: 'nd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('water', [
      state('*', style({ opacity: 1 })),
      state('null', style({ backgroundImage: 'url(/assets/water/water6.jpg)' })),
      state('s-', style({ backgroundImage: 'url(/assets/water/water6.jpg)' })),
      state('s-about', style({ backgroundImage: 'url(/assets/water/water1.jpg)' })),
      state('s-testimonials', style({ backgroundImage: 'url(/assets/water/water3.jpg)' })),
      state('s-testing', style({ backgroundImage: 'url(/assets/water/water2.jpg)' })),
      state('s-contact', style({ backgroundImage: 'url(/assets/water/water7.jpg)' })),

      transition(<any>firstLoad, [
        animate(1000, style({ opacity: 1 })),
      ]),

      transition('* => s-', [
        animate('.5s ease-out', style({ opacity: 0 })),
        animate(1, style({ backgroundImage: 'url(/assets/water/water6.jpg)' })),
        animate('.5s ease-in')
      ]),

      transition('* => s-about', [
        animate('.5s ease-out', style({ opacity: 0 })),
        animate(1, style({ backgroundImage: 'url(/assets/water/water1.jpg)' })),
        animate('.5s ease-in')
      ]),

      transition('* => s-testimonials', [
        animate('.5s ease-out', style({ opacity: 0 })),
        animate(1, style({ backgroundImage: 'url(/assets/water/water3.jpg)' })),
        animate('.5s ease-in')
      ]),

      transition('* => s-testing', [
        animate('.5s ease-out', style({ opacity: 0 })),
        animate(1, style({ backgroundImage: 'url(/assets/water/water2.jpg)' })),
        animate('.5s ease-in')
      ]),

      transition('* => s-contact', [
        animate('.5s ease-out', style({ opacity: 0 })),
        animate(1, style({ backgroundImage: 'url(/assets/water/water7.jpg)' })),
        animate('.5s ease-in')
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {
  url$: Observable<string>;
  isFirstLoad = true;

  constructor(
    angulartics2: Angulartics2,
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private router: Router,
    public media: ObservableMedia,
    private scrollToService: ScrollToService
  ) {
    if (!environment.production) {
      angulartics2.developerMode(true);
    }
  }

  ngOnInit() {
    this.url$ = this.router.events
      .filter(x => x instanceof NavigationEnd)
      .map((x: NavigationEnd) => x.url.replace('/', 's-'))
      .do(x => {
        const scrollToPos = this.isFirstLoad ? 0 : 215;
        this.scrollToService.scrollTo(scrollToPos, 400);
        if (this.isFirstLoad) {
          this.isFirstLoad = false;
        }
      });
  }
}
