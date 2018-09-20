
import { PlotData, Layout } from 'plotly.js';
import opn = require('opn');

import * as express from 'express';
import { readFile } from 'fs';
import { join } from 'path';
import { Server } from 'http';

interface Plot {
  data: Partial<PlotData>[];
  layout?: Partial<Layout>;
}

interface PlotContainer {
  [id: number]: {
    opened: boolean;
    pending: boolean;
    plots: Plot[];
  };
}

interface IServer {
  active: boolean;
  loading: boolean;
  instance: Server | null;
}

export const server: IServer = {
  active: false,
  loading: false,
  instance: null
};

const app = express();
const port = 8080;
let tempContainer: Plot[] = [];
const plotContainer: PlotContainer = {};

export function clear(): void {
  tempContainer = [];
}

export function stack(data: Partial<PlotData>[], layout?: Partial<Layout>): void {
  const container: Plot = layout ? { data, layout } : { data };
  tempContainer.push(container);
}

export function plot(data?: Partial<PlotData>[] | null, layout?: Partial<Layout>, cb?: Function): void {
  if (data) {
    const container: Plot = layout ? { data, layout } : { data };
    tempContainer.push(container);
  }
  const id = Object.keys(plotContainer).length;

  plotContainer[id] = {
    opened: false,
    pending: false,
    plots: tempContainer
  };
  tempContainer = [];
  spawn(() => {
    if (cb) {
      cb(id);
    }
  });
}

function spawn(cb: Function) {
  if (!server.active && !server.loading) {
    server.loading = true;
    app.get('/data/:id', (req, res) => {
      const requestId = req.params.id;
      const container = plotContainer[requestId];
      const plots = container && container.plots;
      plotContainer[requestId].opened = true;
      plotContainer[requestId].pending = false;
      res.send(plots);
      close();
    });

    app.get('/plots/:id', (req, res) => {
      const plotId = req.params.id;
      readFile(join(__dirname, 'www', 'index.html'), 'utf-8', (error, file) => {
        readFile(join(__dirname, 'www', 'script.js'), 'utf-8', (err, script) => {
          script = script.replace('{{plotId}}', `${plotId}`);
          file = file.replace('{{script}}', script);
          return res.send(file);
        });
      });
    });

    server.instance = app.listen(port, () => {
      server.active = true;
      server.loading = false;
      openPlots();
      cb();
    });
  } else if (server.active) {
    openPlots();
    cb();
  }
}

function openPlots() {
  for (const plotEntry of Object.entries(plotContainer)) {
    if (!plotEntry[1].opened && !plotEntry[1].pending) {
      plotEntry[1].pending = true;
      opn(`http://localhost:${port}/plots/${plotEntry[0]}`);
    }
  }
}

function close() {
  const pending = Object.values(plotContainer)
    .map(o => o.pending)
    .reduce((a, b) => a || b);
  const opened = Object.values(plotContainer)
    .map(o => o.opened)
    .reduce((a, b) => a && b);

  if (server.instance && server.active && !pending && opened) {
    (<Server>server.instance).close(() => {
      server.active = false;
    });
  }
}
