import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { TestimonialsComponent } from '../shared/ui/testimonials/testimonials.component';

@Component({
  selector: 'nd-testimonials-page',
  standalone: true,
  imports: [MatCardModule, TestimonialsComponent],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsPageComponent {}
