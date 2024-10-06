import { provideHttpClient, withFetch } from '@angular/common/http';
import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { TestimonialsPageComponent } from './testimonials/testimonials.component';
import { WaterTestingComponent } from './water-testing/water-testing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  {
    path: 'pool-cleaning-services-in-scottsdale',
    component: ServicesComponent,
  },
  {
    path: 'testimonials',
    component: TestimonialsPageComponent,
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
