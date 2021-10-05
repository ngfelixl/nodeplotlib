import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npl-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StacksComponent {}
