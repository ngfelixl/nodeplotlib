import { IPlot, IPlotsContainer } from './models/index';
import { Layout, Plot } from './models/index';
import { Server } from './server';

const port = Number(process.env.PORT) || 8080;
const server = new Server(port);

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
  validate(data, layout);

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
    validate(data, layout);
    stack(data, layout);
  }

  const id = Object.keys(plotContainer).length;

  plotContainer[id] = {
    opened: false,
    pending: false,
    plots,
  };
  plots = [];

  server.spawn(plotContainer);
}

function validate(data: Plot[], layout?: Layout) {
  if (!(data instanceof Array) || data.length === 0) {
    throw new TypeError('Plot data must be an array with at least 1 element');
  }

  if (layout) {
    if (!(layout instanceof Object)) {
      throw new TypeError('Layout must be an object');
    }
  }
}
