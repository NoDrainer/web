import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

import { ITestimonial, ITestimonialsPage } from './testimonials.model';

@Component({
  selector: 'nd-testimonials',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  private route = inject(ActivatedRoute);
  testimonials: ITestimonial[] = this.route.snapshot.data['testimonials'];
  page: ITestimonialsPage = this.route.snapshot.data['page'];
}
