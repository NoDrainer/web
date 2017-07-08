import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITestimonial, ITestimonialsPage } from '../models/testimonial';

@Component({
  selector: 'nd-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonials: ITestimonial[];
  page: ITestimonialsPage

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.testimonials = this.route.snapshot.data.resolved.testimonials;
    this.page = this.route.snapshot.data.resolved.page;
  }
}
