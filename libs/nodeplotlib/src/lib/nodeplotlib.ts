import * as express from 'express';
import { Server } from 'http';
import { Layout, Plot } from './models';
import { exec } from 'child_process';
import { type } from 'os';
import { AddressInfo } from 'net';
import { join } from 'path';
let server: Server | null = null;
const appFolder = join(__dirname, '..', '..', 'web');

export function stack(data: Plot[], layout?: Layout) {
  //
}

/**
 * Start the webserver
 * Open the browser
 */
export function plot(data?: Plot[] | null, layout?: Layout) {
  clear();

  const app = express();
  app.use('/', express.static(appFolder));

  app.get('*', (req, res) => {
    res.status(200).sendFile(`/`, { root: appFolder });
  });
  server = app.listen(0, () => {
    console.log('Nodeplotlib server active');
    openWindow(`http://localhost:${(server.address() as AddressInfo).port}`);
  });
}

export function clear() {
  if (server) {
    server.close();
  }
}

function openWindow(location: string) {
  switch (type()) {
    case 'Linux':
      exec(`xdg-open ${location}`);
      break;
    case 'Darwin':
      exec(`open ${location}`);
      break;
    case 'Windows_NT':
      exec(`start ${location}`);
      break;
  }
}
