# NodePlotLib

[![Build Status](https://travis-ci.org/ngfelixl/nodeplotlib.svg?branch=master)](https://travis-ci.org/ngfelixl/nodeplotlib)
[![Coverage Status](https://coveralls.io/repos/github/ngfelixl/nodeplotlib/badge.svg?branch=master)](https://coveralls.io/github/ngfelixl/nodeplotlib?branch=master)
[![npm version](https://badge.fury.io/js/nodeplotlib.svg)](https://badge.fury.io/js/nodeplotlib)
[![npm](https://img.shields.io/npm/dt/nodeplotlib.svg)](https://www.npmjs.com/package/nodeplotlib)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/nodeplotlib/)

Create publication-ready plots directly within NodeJS on top of [plotly.js](https://plot.ly/javascript/)
without any front-end preparations. Inspired by matplotlib.

[![Animation (View on Github)](https://github.com/ngfelixl/nodeplotlib/blob/master/img/animation.gif)](https://github.com/ngfelixl/nodeplotlib/blob/master/img/animation.gif)

## Installation

```sh
npm install nodeplotlib
# or
yarn add nodeplotlib
```

## Usage

### Overview

Use with TypeScript/JavaScript:

```typescript
import { plot } from 'nodeplotlib';
const data = [{x: [1, 3, 4, 5], y: [3, 12, 1, 4], type: 'line'}];
plot(data);
```

If ES5 use `require()` instead of `import`. Here is a short animation about howto and the results.

### Details

Since Python provides with matplotlib a library for spawning plot windows, NodeJS isn't by default. But there are awesome plotting libraries for usage in front-end. So this lib targets people like scientists who easily want to create beautiful plots in a time-saving way.

The library provides a simple interface with (for now) just three functions. A `plot`, `stack` and a `clear` function. The `plot()` functions spawns a plot to the browser, if a plotdata is given as an argument. Otherwise it plots all the `stack()`ed plotdata. The arguments are of type Plotly.js `PlotData`. With the `clear()` function the stack container can be cleared.

With the stack function the user is able to print multiple charts on one page (e.g. three times the same plot).

```typescript
import { plot, stack, clear } from 'nodeplotlib';
import { PlotData } from 'plotly.js';

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

The plot function plots all stacked plots and the plot given by parameter (if there is one).
Afterwards the temporary container gets cleared and you can call `stack()` and `plot()` again
without any predefined plots.

The functions are of the form:

```typescript
plot(data?: Partial<PlotData>[], layout?: Partial<Layout>, cb?: Function): void;
stack(data?: Partial<PlotData>[], layout?: Partial<Layout>): void;
clear(): void;
```

## Layout

In order to style the plot, one is able to pass in the `layout` parameter. With it
one is able to define styles like *title*, *axis labels*, *subplots* and many more.

Plotly.js provides a nice example for radial plots. Just pass in the plotly.js data
to the `plot()` function and spawn radial plots.

```typescript
const data = [{
  type: 'scatterpolar',
  r: [1.5, 10, 39, 31, 15, 1.5],
  theta: ['A','B','C', 'D', 'E', 'A'],
  fill: 'toself',
  name: 'Group B'
}];

const layout = [
  polar: {
    radialaxis: {
      visible: true,
      range: [0, 50]
    }
  }
];

plot(data, layout);
```

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

## Behind the scenes

The lib launches an express webserver and opens new tabs for every plot located
at `http://localhost:8080/plots/:id`. The client side js requests the plot data
at `http://localhost:8080/data/:id`. After all pending plots are opened in a unique
tab and all the data is requested, the server shuts down. If you fire another plot
the server starts again provides your plot and shuts down automatically.

## Contributing

Contributions in all forms are welcome.

## Developers guide

Fork the [Github repository](https://github.com/ngfelixl/nodeplotlib) and clone
it to your PC. Install the npm dependencies using the `install` command. It installs
the dependencies and copies plotly types to project source. These won't affect
the git tree.

## Get in touch

[![twitter](https://img.shields.io/badge/twitter-%40ngfelixl-blue.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ngfelixl)
[![github](https://img.shields.io/badge/github-%40ngfelixl-blue.svg?logo=github)](https://github.com/ngfelixl)

Hi, I am Felix,
Software developer and Angular, NgRX contributor

![avatar](https://avatars2.githubusercontent.com/u/24190530?s=200&v=4)

If you like this library, think about giving it a star or follow me on twitter or github or check out my personal
the [website](https://felixlemke.com).

## Dependencies

- [opn](https://www.npmjs.com/package/opn)