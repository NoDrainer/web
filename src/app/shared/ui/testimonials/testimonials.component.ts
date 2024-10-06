import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TestimonialsService } from '../../data-access/testimonials.service';
import { TestimonialComponent } from '../testimonial/testimonial.component';

@Component({
  selector: 'nd-testimonials',
  standalone: true,
  imports: [AsyncPipe, TestimonialComponent],
  template: `
    @for (t of testimonials$ | async; track $index) {
      <nd-testimonial [testimonial]="t"></nd-testimonial>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  private testimonialsService = inject(TestimonialsService);
  testimonials$ = this.testimonialsService.testimonials$;
}
