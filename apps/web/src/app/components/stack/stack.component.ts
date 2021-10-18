import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PlotsService } from '../../services/plots.service';

@Component({
  selector: 'npl-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackComponent {
  stackId$: Observable<number|null> = this.activatedRoute.params.pipe(map(params => params.id ? +params.id : null), tap(console.log));
  plots$ = combineLatest([
    this.stackId$,
    this.plotsService.data$
  ]).pipe(
    tap((data) => console.log(data)),
    map(([stackId, { stacks, plots }]) => {
      if (stackId === null) {
        return [];
      }
      const stack = stacks.entities[stackId];
      if (!stack) {
        return [];
      }

      return stack.plotIds.map(id => plots.entities[id])
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private plotsService: PlotsService
  ) {}
}
