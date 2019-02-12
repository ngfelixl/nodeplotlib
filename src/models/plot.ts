import { Layout, PlotData } from './plotly.js/index';

export interface IPlot {
  data: Array<Partial<PlotData>>;
  layout?: Partial<Layout>;
}
