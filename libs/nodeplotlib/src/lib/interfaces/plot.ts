import { Layout as PlotlyLayout, PlotData as PlotlyPlotData } from 'plotly.js';
import { Observable } from 'rxjs';

export type Plot = Partial<PlotlyPlotData>;
export type Layout = Partial<PlotlyLayout>;

export interface PlotDataStream {
  id: number;
  data: Observable<Plot[]>;
  layout: Observable<Layout | undefined>;
}

export interface PlotData {
  id: number;
  data: Plot[];
  layout?: Layout;
}
