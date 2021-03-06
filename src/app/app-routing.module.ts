import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WaterTestingComponent } from './water-testing/water-testing.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsResolver } from './services/testimonialsResolver';

const routeResolver = { resolved: TestimonialsResolver };

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'testimonials', component: TestimonialsComponent, resolve: routeResolver },
  { path: 'testing', component: WaterTestingComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
