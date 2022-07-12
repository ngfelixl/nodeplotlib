import { plot, Plot } from '../../dist/libs/nodeplotlib';
import { interval, map, Observable } from 'rxjs';

const stream$: Observable<Plot[]> = interval(100).pipe(
  map(createSinusPlotFromNumber)
);

function createSinusPlotFromNumber(num: number): Plot[] {
  const data: Plot[] = [
    {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: Array(10)
        .fill(0)
        .map((_, i) => Math.sin(num + i)),
      type: 'scatter',
    },
  ];
  return data;
}

plot(stream$);
