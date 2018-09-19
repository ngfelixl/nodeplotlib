
import { PlotData } from 'plotly.js';
import { join } from 'path';
import opn = require('opn');
import * as express from 'express';
import { Server } from 'http';

let serverInstances = 0;
const app = express();
const port = 8080;
let server: Server;
let container: Partial<PlotData>[][] = [];
let resetFlag = false;

export function clear(): void {
  container = [];
}

export function stack(data: Partial<PlotData>[]): void {
  checkReset();
  container.push(data);
}

export function plot(data?: Partial<PlotData>[]): void {
  checkReset();
  data && container.push(data);
  spawn();
  resetFlag = true;
}

function checkReset() {
  if (resetFlag) {
    container = [];
    resetFlag = false;
  }
}

function spawn() {
  if (serverInstances === 0) {
    app.use(express.static(join(__dirname, 'www')));
    app.get('/data', (_, res) => {
      res.send(container);
      server.close();
    });

    server = app.listen(port, () => {
      opn(`http://localhost:${port}`);
    });
    serverInstances++;
  }
}