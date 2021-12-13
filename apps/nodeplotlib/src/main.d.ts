// This file should be generated automatically by the webpack compiler.
import { PlotData, Layout as PlotlyLayout } from 'plotly.js';
import { Observable } from 'rxjs';

export type Plot = Partial<PlotData>;
export type Layout = Partial<PlotlyLayout>;
export function plot(plot: Plot[] | Observable<Plot[]>, layout?: Layout): void