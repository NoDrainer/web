import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NavigationLinkComponent } from './navigation-link.component';

interface NdLink {
  path: string;
  text: string;
}

@Component({
  selector: 'nd-navigation-links',
  standalone: true,
  imports: [NavigationLinkComponent],
  template: `
    @for (item of links; track item.path) {
      <nd-navigation-link
        [path]="item.path"
        [text]="item.text"
        [isHamburger]="isHamburger()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationLinksComponent {
  isHamburger = input<boolean>(false);

  links: NdLink[] = [
    { text: 'Home', path: '' },
    { text: 'About us', path: 'about' },
    { text: 'Testimonials', path: 'testimonials' },
    { text: 'Water testing', path: 'testing' },
    { text: 'Contact us', path: 'contact' },
  ];
}
