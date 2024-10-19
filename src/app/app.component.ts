import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { debounceTime, filter, map, tap } from 'rxjs';

import { waterAnimation } from './app.animations.ts';
import { FooterComponent } from './shared/ui/footer/footer.component.js';
import { HeaderComponent } from './shared/ui/header/header.component';
import { mediaMatcher } from './shared/utils/media-matcher';
import { ParallaxDirective } from './shared/utils/parallax.directive';
import { ScrollToService } from './shared/utils/scrollTo';

@Component({
  selector: 'nd-root',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ParallaxDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [waterAnimation],
  providers: [ScrollToService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private _angularticsGa = inject(Angulartics2GoogleAnalytics).startTracking();
  private router = inject(Router);
  private scrollToService = inject(ScrollToService);

  isGtSm = mediaMatcher.isGreaterThan(960);
  isFirstLoad = true;

  url$ = this.router.events.pipe(
    filter((x) => x instanceof NavigationEnd),
    debounceTime(1),
    map((x: NavigationEnd) => x.urlAfterRedirects.replace('/', 's-')),
    tap(() => {
      const scrollToPos = this.isFirstLoad ? 0 : 215;
      this.scrollToService.scrollTo(scrollToPos, 400);
      if (this.isFirstLoad) {
        this.isFirstLoad = false;
      }
    })
  );
}
