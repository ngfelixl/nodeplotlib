import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npl-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotsComponent {}
