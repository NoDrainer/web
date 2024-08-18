import { Component } from '@angular/core';

@Component({
  selector: 'nd-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
