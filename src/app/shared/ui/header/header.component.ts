import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { mediaMatcher } from '../../utils/media-matcher';
import { NavigationLinksComponent } from './navigation-links.component';

const shrinkState = {
  small: 'small',
  normal: 'normal',
} as const;

type ShrinkState = keyof typeof shrinkState;

@Component({
  selector: 'nd-header',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NavigationLinksComponent,
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('shrinkOnScroll', [
      state(shrinkState.small, style({ width: '81px' })),
      state(shrinkState.normal, style({ width: '120px' })),
      transition('* <=> *', [animate('200ms ease-out')]),
    ]),
  ],
})
export class HeaderComponent {
  private shrinkOn = 300;

  private isGtSm = mediaMatcher.isGreaterThan(960);

  shrinkAnimationState = signal<ShrinkState>('normal');

  @HostListener('window:scroll')
  scroll() {
    const distanceY = window.scrollY || document.documentElement.scrollTop;

    if (this.isGtSm()) {
      this.shrinkAnimationState.set(
        distanceY < this.shrinkOn ? 'normal' : 'small'
      );
    }
  }
}
