import { Observable } from 'rxjs';
import { reduce, startWith } from 'rxjs/operators';
import { EntityStore, PlotData } from '../models';
import { Update } from '../models/store';
import { actions$ } from './actions';


export type State = EntityStore<PlotData>;

const initialState: State = {
  ids: [],
  entities: {}
};

export const store$: Observable<State> = actions$.pipe(
  reduce((store, action) => {
    switch(action.type) {
      case 'addPlot': return addPlot(store, action.payload as PlotData);
      case 'updatePlot': return updatePlot(store, action.payload as Update<PlotData>);
      case 'removePlot': return removePlot(store, action.payload as number);
      case 'removeAll': return initialState;
      default: return store;
    }
  }, initialState),
  startWith(initialState)
);

function addPlot(store: State, plotdata: PlotData): State {
  const id = Math.max(...store.ids, 0) + 1;
  return {
    ids: [...store.ids, id],
    entities: {...store.entities, [id]: plotdata}
  }
}

function updatePlot(store: State, update: Update<PlotData>): State {
  return {
    ids: store.ids,
    entities: {
      ...store.entities,
      [update.id]: {...store.entities[update.id], ...update.changes}
    }
  }
}

function removePlot(store: State, id: number): State {
  const ids = store.ids.filter(plotId => plotId !== id);
  const entities = {...store.entities};
  delete entities[id];
  return { ids, entities }
}
