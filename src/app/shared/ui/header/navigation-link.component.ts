import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuItem } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nd-navigation-link',
  standalone: true,
  imports: [MatButtonModule, MatMenuItem, RouterLink, RouterLinkActive],
  template: `
    @if (isHamburger()) {
      <button
        mat-menu-item
        [routerLink]="path()"
        routerLinkActive="primary"
        [routerLinkActiveOptions]="{ exact: true }"
        type="button">
        {{ text() }}
      </button>
    } @else {
      <button
        mat-button
        [routerLink]="path()"
        color="primary"
        routerLinkActive="mat-mdc-unelevated-button"
        [routerLinkActiveOptions]="{ exact: true }"
        type="button">
        {{ text() }}
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationLinkComponent {
  path = input.required<string>();
  text = input.required<string>();
  isHamburger = input.required<boolean>();
}
