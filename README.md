# NodePlotLib

[![Build Status](https://travis-ci.org/ngfelixl/nodeplotlib.svg?branch=master)](https://travis-ci.org/ngfelixl/nodeplotlib)
[![Coverage Status](https://coveralls.io/repos/github/ngfelixl/nodeplotlib/badge.svg?branch=master)](https://coveralls.io/github/ngfelixl/nodeplotlib?branch=master)
[![npm version](https://badge.fury.io/js/nodeplotlib.svg)](https://badge.fury.io/js/nodeplotlib)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/nodeplotlib/)

## Installation

```sh
npm install nodeplotlib
# or
yarn add nodeplotlib
```

## Usage

Since Python provides with matplotlib a library for spawning plot windows, NodeJS isn't by default. But there are awesome plotting libraries for usage in front-end. So this lib targets people like scientists who easily want to create beautiful plots in a time-saving way.

The library provides a simple interface with (for now) just three functions. A `plot`, `stack` and a `clear` function. The `plot()` functions spawns a plot to the browser, if a plotdata is given as an argument. Otherwise it plots all the `stack()`ed plotdata. The arguments are of type Plotly.js `PlotData`. With the `clear()` function the stack container can be cleared.

The following snippet provides an 'reallife' example with tensorflow to get an idea of its simplicity and how to use it.

```typescript
import { sequential, layers, tensor2d } from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node-gpu';

// Just import plot
import { plot } from 'nodeplotlib';

const model = sequential();
model.add(layers.dense({units: 1, inputShape: [1], name: 'mytensor'}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

const tensorX = [1, 2, 3, 4];
const tensorY = [1, 3, 5, 7];
const xs = tensor2d(tensorX, [4, 1]);
const ys = tensor2d(tensorY, [4, 1]);

// Spawn a plot in your browser
plot([{ x: tensorX, y: tensorY, type: 'line' }]);
```

With the stack function the user is able to print multiple charts on one page (e.g. three times the same plot).

```typescript
import { plot, stack, clear } from 'nodeplotlib'
import { PlotData } from 'plotly.js'

const data: Partial<PlotData>[] = [{
  x: [ 1, 3, 4, 6, 7],
  y: [ 2, 4, 6, 8, 9],
  type: 'scatter'
}];

stack(data);
stack(data);
stack(data);
plot();
```

Be sure to run the `plot()` function without any argument at the end.

## Plotly.js plot types

For the different plot types have a look at the [Plotly.js documentation](https://plot.ly/javascript/). It provides

| Simple charts              | Advanced charts             |
| -------------------------- | --------------------------- |
| Scatter Plots              | 2d density plots            |
| Line Charts                | Histograms                  |
| Bar Charts                 | Box-plots                   |
| Pie Charts                 | Contour plots               |
| Sankey diagrams            | Heatmaps                    |
| Tables                     | Radar charts                |

Any many more different plottypes.

## Dependencies

- [Expressjs](https://expressjs.com/de/)
- [opn](https://www.npmjs.com/package/opn)
- [Plotly.js](https://plot.ly/javascript/)