import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics, Angulartics2 } from 'angulartics2';
import { environment } from '../environments/environment';

@Component({
  selector: 'nd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    if (!environment.production) {
      angulartics2.developerMode(true);
    }
  }
}
