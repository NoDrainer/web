import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { TestimonialsService } from '../shared/data-access/testimonials.service';
import { TestimonialComponent } from '../shared/ui/testimonial/testimonial.component';

@Component({
  selector: 'nd-services',
  standalone: true,
  imports: [AsyncPipe, RouterLink, TestimonialComponent, MatButtonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  private testimonialsService = inject(TestimonialsService);

  testimonial$ = this.testimonialsService.testimonials$.pipe(
    map(getRandomItem)
  );
}

function getRandomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}
