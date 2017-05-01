import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ScrollToService } from '../services/scrollTo';

export class ScrollToServiceMock { }

@NgModule({
  imports: [
	  ServerModule,
	  AppModule
  ],
  bootstrap: [
	  AppComponent
  ],
  providers: [
    { provide: ScrollToService, useClass: ScrollToServiceMock }
  ]
})
export class AppServerModule {}


