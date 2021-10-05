import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npl-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackComponent {}
