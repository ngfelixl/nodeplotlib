import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Layout, Plot } from '@npl/interfaces';
import { openWindow } from './open-window';
import { PlotsService } from './server/plots/plots.service';
import { ServerModule } from './server/server.module';
import { ShutdownService } from './server/services/shutdown.service';
let app: INestApplication | null = null;
let plotsService: PlotsService;
let shutdownService: ShutdownService;

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
 * Clears all stacked plots and shuts down the server if it
 * exists.
 */
export async function clear() {
  if (app) {
    await app.close();
  }
}

export async function bootstrap(port = 0) {
  if (app) {
    console.log('App is already up and running');
    return;
  }
  app = await NestFactory.create(ServerModule);
  plotsService = app.get(PlotsService);
  shutdownService = app.get(ShutdownService);
  await app.listen(port);
  console.log('Server runnng at', app.getHttpServer().address().port);

  const subscription = shutdownService.shutdown$.subscribe(async () => {
    console.log('Server shutting down');
    subscription.unsubscribe();
    await app.close();
    app = null;
  });
}
