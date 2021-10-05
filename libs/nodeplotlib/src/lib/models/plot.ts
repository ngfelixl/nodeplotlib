import { Layout as FullLayout, PlotData as PlotlyPlotData } from 'plotly.js';

export type Plot = Partial<PlotlyPlotData>;
export type Layout = Partial<FullLayout>;

export interface PlotData {
  data: Plot[];
  layout?: Layout;
}

export interface PlotEntities {
  [id: number]: PlotData;
}
