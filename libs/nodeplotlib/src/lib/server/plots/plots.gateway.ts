import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { PlotData } from '../../interfaces';
import { combineLatest, merge, Observable } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';
import { BridgeService } from '../services/bridge.service';
import { PlotsService } from './plots.service';

@WebSocketGateway({ transports: ['polling'] })
export class PlotsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientMap = new Map<WebSocket, number>();
  private plotDataStream$: Observable<PlotData>;

  constructor(
    private bridgeService: BridgeService,
    private plotsService: PlotsService
  ) {
    this.plotDataStream$ = this.plotsService.plotIds$.pipe(
      switchMap((plotIds) =>
        merge(
          ...Array.from(plotIds).map((id) => {
            const plotDataStream = this.plotsService.plotEntities.get(id);
            if (!plotDataStream) {
              return new Observable<PlotData>();
            }
            return combineLatest([
              plotDataStream.data,
              plotDataStream.layout,
            ]).pipe(map(([data, layout]) => ({ id, data, layout })));
          })
        )
      ),
      share()
    );
  }

  @SubscribeMessage('readplots')
  handleEvent() {
    return this.plotDataStream$.pipe(
      map((plotData) => ({
        event: 'plotdata',
        data: plotData,
      }))
    );
  }

  handleConnection(client: WebSocket) {
    console.log('client connected');
    this.clientMap.set(client, Date.now());
  }

  handleDisconnect(client: WebSocket) {
    console.log('client disconnected');
    this.clientMap.delete(client);

    if (this.clientMap.size === 0) {
      this.bridgeService.shutdown$.next(null);
    }
  }
}
