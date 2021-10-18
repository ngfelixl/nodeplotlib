import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { exec } from 'child_process';
import { type } from 'os';
import { Layout, Plot } from '@npl/interfaces';
import { NodeplotlibModule } from './nodeplotlib.module';
import { PlotsService } from './plots/plots.service';
let app: INestApplication|null = null;
let plotsService: PlotsService;


/**
 * Plots the registered plots to a browser.
 * @param data
 * @param layout
 * @param cb
 */
export async function plot(data?: Plot[] | null, layout?: Layout) {
  await bootstrap();
  if (data) {
    plotsService.addPlot({ data, layout });
  }

  const address = app.getHttpServer().address();
  openWindow(`http://localhost:${address.port}`);
}


/**
 * Stacks plot data to a stack. When executing `plot`
 * the stack will also be plotted.
 * @param data
 * @param layout
 */
export async function stack(data: Plot[], layout?: Layout) {
  await bootstrap();

  plotsService.addPlot({ data, layout });
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
  if (app) {
    return;
  }
  app = await NestFactory.create(NodeplotlibModule);
  plotsService = app.get(PlotsService);
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
