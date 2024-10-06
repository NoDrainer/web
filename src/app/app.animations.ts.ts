import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function firstLoad(from: string) {
  return from == null;
}

export const waterAnimation = trigger('water', [
  state('*', style({ opacity: 1 })),
  state('null', style({ backgroundImage: 'url(/water/water6.jpg)' })),
  state('s-', style({ backgroundImage: 'url(/water/water6.jpg)' })),
  state('s-about', style({ backgroundImage: 'url(/water/water1.jpg)' })),
  state(
    's-pool-cleaning-services-in-scottsdale',
    style({ backgroundImage: 'url(/water/water8.jpg)' })
  ),
  state('s-testimonials', style({ backgroundImage: 'url(/water/water3.jpg)' })),
  state('s-testing', style({ backgroundImage: 'url(/water/water2.jpg)' })),
  state('s-contact', style({ backgroundImage: 'url(/water/water7.jpg)' })),

  transition(firstLoad, [animate(1000, style({ opacity: 1 }))]),

  transition('* => s-', [
    animate('.5s ease-out', style({ opacity: 0 })),
    animate(1, style({ backgroundImage: 'url(/water/water6.jpg)' })),
    animate('.5s ease-in'),
  ]),

  transition('* => s-about', [
    animate('.5s ease-out', style({ opacity: 0 })),
    animate(1, style({ backgroundImage: 'url(/water/water1.jpg)' })),
    animate('.5s ease-in'),
  ]),

  transition('* => s-pool-cleaning-services-in-scottsdale', [
    animate('.5s ease-out', style({ opacity: 0 })),
    animate(1, style({ backgroundImage: 'url(/water/water8.jpg)' })),
    animate('.5s ease-in'),
  ]),

  transition('* => s-testimonials', [
    animate('.5s ease-out', style({ opacity: 0 })),
    animate(1, style({ backgroundImage: 'url(/water/water3.jpg)' })),
    animate('.5s ease-in'),
  ]),

  transition('* => s-testing', [
    animate('.5s ease-out', style({ opacity: 0 })),
    animate(1, style({ backgroundImage: 'url(/water/water2.jpg)' })),
    animate('.5s ease-in'),
  ]),

  transition('* => s-contact', [
    animate('.5s ease-out', style({ opacity: 0 })),
    animate(1, style({ backgroundImage: 'url(/water/water7.jpg)' })),
    animate('.5s ease-in'),
  ]),
]);
