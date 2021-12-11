import { Plot } from '@npl/interfaces';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const stream$: Observable<Plot[]> = interval(100).pipe(
  map((index) => {
    const data: Plot = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: Array(10)
        .fill(0)
        .map((_, i) => Math.sin(index + i)),
      type: 'scatter',
    };
    return [data];
  })
);
