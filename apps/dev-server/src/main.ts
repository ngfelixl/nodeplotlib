/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { plot } from '@npl/nodeplotlib';
import {
  data as histogram,
  layout as histogramLayout,
} from './data/2d-histogram';
import { data as bar } from './data/bar';
import { stream$ } from './data/line-stream';
import { data as sankey, layout as sankeyLayout } from './data/sankey';
import { data as scatter, layout as scatterPlotLayout } from './data/scatter';
import { data as table } from './data/table';

plot(stream$);
plot(scatter, scatterPlotLayout);
plot(bar);
plot(sankey, sankeyLayout);
plot(histogram, histogramLayout);
plot(table);
