import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { exec } from 'child_process';
import { type } from 'os';
import { addPlot$ } from './+state/actions';
import { Layout, Plot } from './models';
import { NodeplotlibModule } from './nodeplotlib.module';
let app: INestApplication|null = null;


/**
 * Plots the registered plots to a browser.
 * @param data
 * @param layout
 * @param cb
 */
export async function plot(data?: Plot[] | null, layout?: Layout) {
  addPlot$.next({ data, layout });

  await bootstrap();
  const address = app.getHttpServer().address();
  openWindow(`http://localhost:${address.port}`);
}


/**
 * Stacks plot data to a stack. When executing `plot`
 * the stack will also be plotted.
 * @param data
 * @param layout
 */
export function stack(data: Plot[], layout?: Layout) {
  addPlot$.next({ data, layout });
}


/**
 * Clears all stacked plots and shuts down the server if it
 * exists.
 */
export async function clear() {
  if (app) {
    await app.close();
  }
}


async function bootstrap() {
  await clear();
  app = await NestFactory.create(NodeplotlibModule);
  await app.listen(0);
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
