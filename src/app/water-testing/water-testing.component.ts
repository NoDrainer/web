import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nd-water-testing',
  templateUrl: './water-testing.component.html',
  styleUrls: ['./water-testing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaterTestingComponent {}
