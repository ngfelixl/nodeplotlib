import { IPlot } from './plot';

export interface IPlotsContainer {
  [id: number]: {
    opened: boolean;
    pending: boolean;
    plots: IPlot[];
  };
}
