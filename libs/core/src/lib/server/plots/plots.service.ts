import { Injectable } from '@nestjs/common';
import { PlotData } from '@npl/interfaces';
import { Observable, of } from 'rxjs';

@Injectable()
export class PlotsService {
  plots = new Map<number, Observable<PlotData>>();
  private currentPlotId = 0;

  addPlot(plotData: Omit<PlotData, 'id'>) {
    const plot: PlotData = {
      id: this.currentPlotId++,
      data: plotData.data,
      layout: plotData.layout,
    };

    this.plots.set(plot.id, of(plot));
  }
}
