import { IPlot } from './plot';

export interface IPlotContainer {
  [id: number]: {
    opened: boolean;
    pending: boolean;
    plots: IPlot[];
  };
}
