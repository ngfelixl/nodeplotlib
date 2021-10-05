import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npl-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {}
