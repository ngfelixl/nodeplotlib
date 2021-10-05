import { Layout as FullLayout, PlotData } from 'plotly.js';

export type Plot = Partial<PlotData>;
export type Layout = Partial<FullLayout>;

export interface IPlot {
  data: Plot[];
  layout?: Layout;
}
