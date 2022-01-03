import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npl-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialComponent {}
