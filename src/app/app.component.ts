import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { ObservableMedia } from '@angular/flex-layout';
import { Angulartics2GoogleAnalytics, Angulartics2 } from 'angulartics2';
import { environment } from '../environments/environment';
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

      transition(firstLoad, [
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
    public media: ObservableMedia
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
        let scrollToPos = this.isFirstLoad ? 0 : 215;
        scrollTo(scrollToPos, 400);
        if (this.isFirstLoad) {
          this.isFirstLoad = false;
        }
      });
  }

  private scrollToTop(scrollDuration: number) {
    let cosParameter = window.scrollY / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();

    function step(newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) window.scrollTo(0, 0);
      if (window.scrollY === 0) return;
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
}

function easeInOutQuad(t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

function easeInCubic(t, b, c, d) {
  var tc = (t/=d)*t*t;
  return b+c*(tc);
};

function inOutQuintic(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || (<any>window).mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

function scrollTo(to, duration, callback?) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount;
    (<any>document.body.parentNode).scrollTop = amount;
    document.body.scrollTop = amount;
  }
  function position() {
    return document.documentElement.scrollTop || (<any>document.body.parentNode).scrollTop || document.body.scrollTop;
  }
  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 20;
  duration = (typeof (duration) === 'undefined') ? 500 : duration;
  
  var animateScroll = function() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof(callback) === 'function') {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  animateScroll();
}
