import { PlotData } from './plot';

export interface PlotsContainer {
  [id: number]: {
    opened: boolean;
    pending: boolean;
    plots: PlotData[];
  };
}
