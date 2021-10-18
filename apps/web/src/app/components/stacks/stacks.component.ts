import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import { PlotsService } from '../../services/plots.service';

@Component({
  selector: 'npl-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StacksComponent {
  stacks$ = this.plotsService.data$.pipe(
    pluck('stacks'),
    map(({ ids, entities }) => ids.map((id) => entities[id])),
    catchError(() => of([]))
  );
  constructor(private plotsService: PlotsService) {}
}
