import { Injectable } from '@nestjs/common';
import { PlotDataStream } from '../../interfaces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class PlotsService {
  plotEntities = new Map<number, PlotDataStream>();
  plotIds$ = new BehaviorSubject<Set<number>>(new Set());
  private currentPlotId = 0;
  private bufferSubscription?: Subscription;

  setBuffer(buffer$: Observable<Omit<PlotDataStream, 'id'>[]>) {
    this.bufferSubscription?.unsubscribe();
    this.bufferSubscription = buffer$
      .pipe(filter((buffer) => buffer.length > 0))
      .subscribe((buffer) => this.readBuffer(buffer));
  }

  addPlot(plotData: Omit<PlotDataStream, 'id'>) {
    const plot: PlotDataStream = {
      id: this.currentPlotId++,
      data: plotData.data,
      layout: plotData.layout,
      config: plotData.config,
    };

    this.plotEntities.set(plot.id, plot);
    const plotIds = this.plotIds$.value;
    plotIds.add(plot.id);
    this.plotIds$.next(plotIds);
  }

  /**
   * Function gets executed on the main process and makes the service read
   * the buffered plot data.
   * @param buffer
   */
  readBuffer(buffer: Omit<PlotDataStream, 'id'>[]) {
    for (const plot of buffer) {
      this.addPlot(plot);
    }
  }
}
