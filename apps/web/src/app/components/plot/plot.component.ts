import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { PlotsService } from '../../services/plots.service';

@Component({
  selector: 'npl-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotComponent {
  stack$ = this.activatedRoute.params.pipe(
    map(params => params.id),
    distinctUntilChanged(),
    switchMap(stackId => this.plotsService.loadPlotsStack(stackId))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private plotsService: PlotsService
  ) {}
}
