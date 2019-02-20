import { IPlot, IPlotsContainer } from './models/index';
import { Layout, Plot } from './models/index';
import { Server } from './server';


const server = new Server(8080);

export let plots: IPlot[] = [];
export const plotContainer: IPlotsContainer = {};

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
export function stack(data: Plot[], layout?: Layout): void {
  const container: IPlot = layout ? { data, layout } : { data };
  plots.push(container);
}

/**
 * Plots the registered plots to a browser.
 * @param data
 * @param layout
 * @param cb
 */
export function plot(data?: Plot[] | null, layout?: Layout): void {
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

  server.spawn(plotContainer);
}
