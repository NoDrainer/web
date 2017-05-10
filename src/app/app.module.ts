import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdCardModule,
  MdButtonModule,
  MdMenuModule,
  MdInputModule,
  MdIconModule
} from '@angular/material';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WaterTestingComponent } from './water-testing/water-testing.component';
import { ContactComponent } from './contact/contact.component';
import { Ng2parallax } from '../directives/parallax.directive';
import { ScrollToService } from '../services/scrollTo';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    TestimonialsComponent,
    WaterTestingComponent,
    ContactComponent,
    Ng2parallax
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'no-drainer' }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    NgxErrorsModule,
    MdCardModule,
    MdButtonModule,
    MdMenuModule,
    MdInputModule,
    MdIconModule,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics])
  ],
  providers: [
    ScrollToService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
