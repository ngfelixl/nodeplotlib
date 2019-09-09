import { exec } from 'child_process';
import { readFile } from 'fs';
import { createServer, IncomingMessage, Server as HttpServer, ServerResponse } from 'http';
import { Socket } from 'net';
import { type } from 'os';
import { join } from 'path';
import { IPlotsContainer } from './models';

export class Server {
  private instance: HttpServer;
  private plotsContainer: IPlotsContainer = {};
  private port: number;
  private sockets: {[id: number]: Socket} = {};
  private nextSocketID = 0;

  constructor(port: number) {
    this.port = port;
    this.instance = this.createServer();

    this.instance.on('connection', (socket: Socket) => {
      const id = this.nextSocketID++;
      this.sockets[id] = socket;

      socket.on('close', () => {
        delete this.sockets[id];
      });
    });
  }

  /**
   * Updates the plotdata, decides make the server listen again
   * and opens a new browser window targetting the webservers
   * data address.
   */
  public spawn(plotsContainer: IPlotsContainer) {
    this.plotsContainer = plotsContainer;

    if (!this.instance.address()) {
      this.instance.listen(this.port);
    }

    this.openBrowserWindow();
  }

  /**
   * Closes the webserver, destroys all connected sockets
   * and clears the plots container.
   */
  public clean() {
    if (this.instance.address()) {
      this.instance.close();
    }

    for (const socket of Object.values(this.sockets)) {
      socket.destroy();
    }

    this.plotsContainer = {};
  }

  /**
   * Opens the browser window using the opn-NPM module and
   * marks the container flag as pending. This means the website
   * does not have got its data yet.
   */
  private openBrowserWindow() {
    for (const plotEntry of Object.entries(this.plotsContainer)) {
      if (!plotEntry[1].opened && !plotEntry[1].pending) {
        plotEntry[1].pending = true;
        this.openWindow(`http://localhost:${this.port}/plots/${plotEntry[0]}/index.html`);
      }
    }
  }

  private openWindow(location: string) {
    switch (type()) {
      case 'Linux': exec(`xdg-open ${location}`); break;
      case 'Darwin': exec(`open ${location}`); break;
      case 'Windows_NT': exec(`start ${location}`); break;
    }
  }

  /**
   * Creates the Webserver instance
   */
  private createServer(): HttpServer {
    return createServer((req, res) => {
      this.serveData(req, res);
      this.serveWebsite(req, res);
    });
  }

  /**
   * Serves the plot data at /data/:id of the container[id].
   * It markes the container as opened and not pending anymore.
   * @param req 
   * @param res 
   */
  private serveData(req: IncomingMessage, res: ServerResponse) {
    if (req && req.url && req.url.match(/data\/[0-9]+/)) {
      const segments = req.url.split('/');
      const id = +segments[segments.length - 1];
      
      const container = this.plotsContainer[id];
      const temporaryPlots = container && container.plots;

      this.plotsContainer[id].opened = true;
      this.plotsContainer[id].pending = false;

      res.end(JSON.stringify(temporaryPlots));
      this.close();
    }
  }

  /**
   * Serves the website at http://localhost:PORT/plots/:id/index.html
   * @param req 
   * @param res 
   */
  private serveWebsite(req: IncomingMessage, res: ServerResponse) {
    if (req && req.url && req.url.match(/plots\/[0-9]+\/index.html/)) {
      const segments = req.url.split('/');
      const id = segments[segments.length - 2];

      readFile(join(__dirname, '..', 'www', 'index.html'), 'utf-8', (error, file) => {
        if (error) {
          res.writeHead(404);
          res.end(JSON.stringify(error));
          return;
        }
        file = file.replace('{{plotid}}', id);
        res.writeHead(200);
        res.end(file);
      });
    } else if (req && req.url && (req.url.match(/nodeplotlib.min.js/) || req.url && req.url.match(/plotly.min.js/))) {
      const segments = req.url.split('/');
      const script = segments[segments.length - 1];

      readFile(join(__dirname, '..', 'www', script), 'utf-8', (err, file) => {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }

        if (script === 'nodeplotlib.min.js') {
          file = file.replace('{{port}}', `${this.port}`);
        }
        res.setHeader('content-type', 'text/javascript');
        res.writeHead(200);
        res.end(file);
      });
    } else {
      res.writeHead(404);
      res.end('Server address not found');
      return;
    }
  }

  /**
   * Closes the webserver if there are no more pending plots
   * and all plots were opened
   */
  private close() {
    const pending = Object.values(this.plotsContainer)
      .reduce((a, b) => a || b.pending, false);
    const opened = Object.values(this.plotsContainer)
      .reduce((a, b) => a && b.opened, true);

    if (this.instance && !pending && opened) {
      this.clean();
    }
  }
}