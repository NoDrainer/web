import {
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AngularRouterTracking,
  Angulartics2,
  ANGULARTICS2_TOKEN,
  Angulartics2Settings,
  RouterlessTracking,
} from 'angulartics2';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export function provideAngulartics(
  settings: Partial<Angulartics2Settings>
): Provider[] {
  return [
    { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
    { provide: RouterlessTracking, useClass: AngularRouterTracking },
    Angulartics2,
  ];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAngulartics({
      developerMode: !environment.production,
    }),
  ],
};
