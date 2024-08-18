import { provideHttpClient, withFetch } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { testimonialsResolver } from './testimonials/testimonials.resolver';
import { WaterTestingComponent } from './water-testing/water-testing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  {
    path: 'testimonials',
    component: TestimonialsComponent,
    resolve: testimonialsResolver,
  },
  { path: 'testing', component: WaterTestingComponent },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((x) => x.ContactComponent),
    providers: [provideHttpClient(withFetch())],
  },
  { path: '**', redirectTo: '' },
];
