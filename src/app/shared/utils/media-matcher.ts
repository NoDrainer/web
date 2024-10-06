import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import {
  assertInInjectionContext,
  computed,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

function isGreaterThan(minWidthPx: number) {
  return comparatorFn(`(min-width: ${minWidthPx}px)`);
}

function isLessThan(maxWidthPx: number) {
  return comparatorFn(`(max-width: ${maxWidthPx}px)`);
}

function isBetween(minWidthPx: number, maxWidthPx: number) {
  const mediaQuery = `(min-width: ${minWidthPx}px) and (max-width: ${maxWidthPx}px)`;
  return comparatorFn(mediaQuery);
}

function comparatorFn(mediaQuery: string) {
  assertInInjectionContext(isGreaterThan);

  const platformId = inject(PLATFORM_ID);
  const destroyRef = inject(DestroyRef);
  const media = inject(MediaMatcher);

  const mobileQuery = media.matchMedia(mediaQuery);
  const state = signal(false);

  function setterFn() {
    state.set(mobileQuery.matches);
  }

  if (isPlatformBrowser(platformId)) {
    setterFn();

    mobileQuery.addEventListener('change', setterFn);

    destroyRef.onDestroy(() => {
      mobileQuery.removeEventListener('change', setterFn);
    });
  }

  return computed(() => state());
}

export const mediaMatcher = {
  isGreaterThan,
  isLessThan,
  isBetween,
};
