import { Layout, Plot } from '@npl/interfaces';

function normal() {
  let x = 0,
    y = 0,
    rds;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    rds = x * x + y * y;
  } while (rds == 0 || rds > 1);
  const c = Math.sqrt((-2 * Math.log(rds)) / rds); // Box-Muller transform
  return x * c; // throw away extra sample y * c
}

const N = 2000;
const a = -1;
const b = 1.2;

const step = (b - a) / (N - 1);
const t = new Array(N),
  x = new Array(N),
  y = new Array(N);

for (let i = 0; i < N; i++) {
  t[i] = a + step * i;
  x[i] = Math.pow(t[i], 3) + 0.3 * normal();
  y[i] = Math.pow(t[i], 6) + 0.3 * normal();
}

const trace1: Plot = {
  x: x,
  y: y,
  mode: 'markers',
  name: 'points',
  marker: {
    color: 'rgb(102,0,0)',
    size: 2,
    opacity: 0.4,
  },
  type: 'scatter',
};
const trace2: Plot = {
  x: x,
  y: y,
  name: 'density',
  ncontours: 20,
  colorscale: 'Hot',
  reversescale: true,
  showscale: false,
  type: 'histogram2dcontour',
} as Plot;
const trace3: Plot = {
  x: x,
  name: 'x density',
  marker: { color: 'rgb(102,0,0)' },
  yaxis: 'y2',
  type: 'histogram',
};
const trace4: Plot = {
  y: y,
  name: 'y density',
  marker: { color: 'rgb(102,0,0)' },
  xaxis: 'x2',
  type: 'histogram',
};
export const data = [trace1, trace2, trace3, trace4];
export const layout: Layout = {
  showlegend: false,
  autosize: false,
  width: 600,
  height: 550,
  margin: { t: 50 },
  hovermode: 'closest',
  bargap: 0,
  xaxis: {
    domain: [0, 0.85],
    showgrid: false,
    zeroline: false,
  },
  yaxis: {
    domain: [0, 0.85],
    showgrid: false,
    zeroline: false,
  },
  xaxis2: {
    domain: [0.85, 1],
    showgrid: false,
    zeroline: false,
  },
  yaxis2: {
    domain: [0.85, 1],
    showgrid: false,
    zeroline: false,
  },
};
