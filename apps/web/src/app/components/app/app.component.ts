import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'npl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
