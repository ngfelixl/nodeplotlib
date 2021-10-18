import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlotsService } from '../../services/plots.service';

@Component({
  selector: 'npl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private plotsService: PlotsService) {
    this.plotsService.loadPlots().subscribe();
  }
}
