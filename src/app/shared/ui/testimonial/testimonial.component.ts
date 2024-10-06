import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ITestimonialVm } from '../../../testimonials/testimonials.model';

@Component({
  selector: 'nd-testimonial',
  standalone: true,
  imports: [MatCardModule],
  styleUrls: ['./testimonial.component.scss'],
  template: `
    <mat-card>
      <mat-card-content>
        <blockquote>
          @for (paragraph of testimonial().bodyParagraphs; track $index) {
            {{ paragraph }}
          }
        </blockquote>

        <p class="text-right color-primary">
          --
          {{ testimonial().fullName }}<br />
          {{ testimonial().location }}
        </p>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialComponent {
  testimonial = input.required<ITestimonialVm>();
}
