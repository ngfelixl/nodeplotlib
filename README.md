# NodePlot

[![Build Status](https://travis-ci.org/ngfelixl/nodeplot.svg?branch=master)](https://travis-ci.org/ngfelixl/nodeplot)
[![Coverage Status](https://coveralls.io/repos/github/ngfelixl/nodeplot/badge.svg?branch=master)](https://coveralls.io/github/ngfelixl/nodeplot?branch=master)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/nodeplot/)

## Installation

```sh
npm install nodeplot
# or
yarn add nodeplot
```

## Usage

Since Python provides with matplotlib a library for spawning plot windows, NodeJS isn't by default. But there are awesome plotting libraries for usage in front-end. So this lib targets people like scientists who easily want to plot in a time-saving way.

The library provides a simple interface with (for now) just three functions. A `plot`, `stack` and a `clear` function.

```typescript
import { plot, stack, clear } from 'nodeplot'
import { PlotData } from 'plotly.js'

const data: Partial<PlotData>[] = [
  {
    x: [ 1, 3, 4, 6, 7],
    y: [ 2, 4, 6, 8, 9],
    type: 'scatter'
  }
]

plot(data);
```

With the stack function the user is able to print multiple charts on one page.


```typescript
import { plot, stack, clear } from 'nodeplot'
import { PlotData } from 'plotly.js'

const data: Partial<PlotData>[] = [
  {
    x: [ 1, 3, 4, 6, 7],
    y: [ 2, 4, 6, 8, 9],
    type: 'scatter'
  }
]

stack(data);
stack(data);
stack(data);

plot();
```

Be sure to run the `plot()` function without any argument at the end.

## Plotly.js plot types

For the different plot types have a look at the [Plotly.js documentation](https://plot.ly/javascript/). It handles

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