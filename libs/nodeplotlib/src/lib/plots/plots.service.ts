import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { PlotData, Stack, EntityStore } from '@npl/interfaces';

const initialState: Stack = {
  id: 0,
  name: 'Default',
  transferred: false,
  containsStreams: false,
  plotIds: [],
};

@Injectable()
export class PlotsService {
  stacks$ = new BehaviorSubject<EntityStore<Stack>>({
    ids: [0],
    entities: { 0: initialState },
  });
  plots$ = new BehaviorSubject<EntityStore<PlotData>>({
    ids: [],
    entities: {},
  });
  currentStackId = 0;
  currentPlotId = 0;

  newStack() {
    //
  }

  addPlot(plotData: Omit<PlotData, 'id'>) {
    const plotsState = this.plots$.getValue();
    const stackState = this.stacks$.getValue();
    const stack = stackState.entities[this.currentStackId];

    const plot: PlotData = {
      id: this.currentPlotId++,
      data: plotData.data,
      layout: plotData.layout,
    };

    this.plots$.next({
      ids: [...plotsState.ids, plot.id],
      entities: { ...plotsState.entities, [plot.id]: plot },
    });

    this.stacks$.next({
      ids: stackState.ids,
      entities: {
        ...stackState.entities,
        [stack.id]: { ...stack, plotIds: [...stack.plotIds, plot.id] },
      },
    });
  }
}
