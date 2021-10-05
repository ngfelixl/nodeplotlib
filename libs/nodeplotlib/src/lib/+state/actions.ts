import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action, PlotData } from '../models';
import { Update } from '../models/store';

export const addPlot$ = new Subject<PlotData>();
export const removePlot$ = new Subject<number>();
export const removeAll$ = new Subject<void>();
export const updatePlot$ = new Subject<Update<PlotData>>();

export const actions$: Observable<Action> = merge(
  addPlot$.pipe(map(plotdata => ({ type: 'addPlot', payload: plotdata}) as Action<PlotData>)),
  updatePlot$.pipe(map(changes => ({ type: 'updatePlot', payload: changes}) as Action<Update<PlotData>>)),
  removePlot$.pipe(map(id => ({ type: 'removePlot', payload: id}))),
  removeAll$.pipe(map(() => ({ type: 'removeAll' })))
);
