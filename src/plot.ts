import { IPlot, IPlotContainer } from './models/index';
import { Layout, PlotData } from './models/plotly.js/index';
import { Server } from './server';


const server = new Server(8080);

export let plots: IPlot[] = [];
export const plotContainer: IPlotContainer = {};

/**
 * Clears all stacked plots.
 */
export function clear(): void {
  plots = [];
}

/**
 * Stacks plot data to a stack. When executing `plot`
 * the stack will also be plotted.
 * @param data
 * @param layout
 */
export function stack(data: Array<Partial<PlotData>>, layout?: Partial<Layout>): void {
  const container: IPlot = layout ? { data, layout } : { data };
  plots.push(container);
}

/**
 * Plots the registered plots to a browser.
 * @param data
 * @param layout
 * @param cb
 */
export function plot(data?: Array<Partial<PlotData>> | null, layout?: Partial<Layout>, cb?: (id: number) => void): void {
  if (data) {
    stack(data, layout);
  }
  const id = Object.keys(plotContainer).length;

  plotContainer[id] = {
    opened: false,
    pending: false,
    plots
  };
  plots = [];

  server.spawn(plotContainer, () => {
    if (cb) {
      cb(id);
    }
  });
}
