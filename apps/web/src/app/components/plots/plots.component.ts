import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlotData } from '@npl/interfaces';
import { PlotsService } from '../../services/plots.service';

@Component({
  selector: 'npl-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotsComponent {
  plots$ = this.plotsService.plots$;

  constructor(private plotsService: PlotsService) {}

  trackById(_: number, plot: PlotData) {
    return plot.id;
  }
}
