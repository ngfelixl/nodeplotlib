import { Layout as PlotlyLayout, PlotData } from './plotly.js/index';

export type Plot = Partial<PlotData>;
export type Layout = Partial<PlotlyLayout>;

export interface IPlot {
  data: Plot[];
  layout?: Layout;
}
