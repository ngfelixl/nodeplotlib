
import { PlotData } from 'plotly.js';
import opn = require('opn');

import * as express from 'express';
import { readFile } from 'fs';
import { join } from 'path';
import { Server } from 'http';

interface PlotContainer {
  [id: number]: {
    opened: boolean;
    pending: boolean;
    request: boolean;
    data: Partial<PlotData>[][];
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
let tempContainer: Partial<PlotData>[][] = [];
const plotContainer: PlotContainer = {};

export function clear(): void {
  tempContainer = [];
}

export function stack(data: Partial<PlotData>[]): void {
  tempContainer.push(data);
}

export function plot(data?: Partial<PlotData>[] | null, cb?: Function): number {
  if (data) { tempContainer.push(data); }
  const id = Object.keys(plotContainer).length;

  plotContainer[id] = {
    opened: false,
    pending: false,
    request: false,
    data: tempContainer
  };
  tempContainer = [];
  spawn(() => {
    if (cb) {
      cb(id);
    }
  });
  return id;
}

function spawn(cb: Function) {
  if (!server.active && !server.loading) {
    console.log('Open server');
    server.loading = true;
    app.get('/data/:id', (req, res) => {
      const requestId = req.params.id;
      const container = plotContainer[requestId];
      const result = container && container.data;
      container.request = true;
      res.send(result);
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
  const promises = [];
  for (const plotEntry of Object.entries(plotContainer)) {
    if (!plotEntry[1].opened && !plotEntry[1].pending) {
      plotEntry[1].pending = true;
      promises.push(opn(`http://localhost:${port}/plots/${plotEntry[0]}`)
        .then(() => {
          plotEntry[1].opened = true;
          plotEntry[1].pending = false;
        }));
    }
  }
}

function close() {
  const pending = Object.values(plotContainer)
    .map(o => o.pending)
    .reduce((a, b) => a || b);
  const requested = Object.values(plotContainer)
    .map(o => o.request)
    .reduce((a, b) => a && b);

  if (server.instance && server.active && !pending && requested) {
    console.log('Close server');
    (<Server>server.instance).close(() => {
      server.instance = null;
    });
    server.active = false;
  }
}
