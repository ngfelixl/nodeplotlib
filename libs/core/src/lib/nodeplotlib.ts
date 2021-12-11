import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Layout, Plot, PlotDataStream } from '@npl/interfaces';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { PlotsService } from './server/plots/plots.service';
import { ServerModule } from './server/server.module';
import { BridgeService } from './server/services/bridge.service';
let app: INestApplication | null = null;
let plotsService: PlotsService;
let bridgeService: BridgeService;

// This variable is used to determine if the nestjs app is running
// or starting. Because it is "async" and the plot function is not,
// we need to make sure that we do not bootstrap the app twice in the
// same macro-task.
let appRuns = false;
let shutdownSubscription: Subscription;
const plotsBuffer$ = new BehaviorSubject<Omit<PlotDataStream, 'id'>[]>([]);

/**
 * Plots the given data with the given layout. This function
 * starts a server if one is not already running.
 * @param data
 * @param layout
 * @param cb
 */
export function plot(data: Plot[] | Observable<Plot[]>, layout?: Layout) {
  bootstrap();
  const bufferedPlots = plotsBuffer$.value;

  const streamData$: Observable<Plot[]> =
    data instanceof Observable ? data : of(data);
  plotsBuffer$.next([
    ...bufferedPlots,
    { data: streamData$, layout: of(layout) },
  ]);
}

/**
 * Clears all plots and shuts down the server if it
 * exists.
 */
export async function clear() {
  if (app) {
    await app.close();
  }
}

export async function bootstrap(port = 0) {
  if (appRuns) {
    console.log('App is already up and running');
    return;
  }
  appRuns = true;
  app = await NestFactory.create(ServerModule);
  plotsService = app.get(PlotsService);
  bridgeService = app.get(BridgeService);
  await app.listen(port);

  const actualPort = app.getHttpServer().address().port;
  bridgeService.setPort(actualPort);
  plotsService.setBuffer(plotsBuffer$);
  console.log('Server runnng at', actualPort);

  shutdownSubscription = bridgeService.shutdown$.subscribe(shutdown);
}

export async function shutdown() {
  console.log('Server shutting down');
  shutdownSubscription?.unsubscribe();
  appRuns = false;

  if (app) {
    await app.close();
  }
}
