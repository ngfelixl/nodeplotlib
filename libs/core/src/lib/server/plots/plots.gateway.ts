import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ShutdownService } from '../services/shutdown.service';

@WebSocketGateway({ transports: ['polling'] })
export class PlotsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientMap = new Map<WebSocket, number>();

  constructor(private shutdownService: ShutdownService) {}

  @SubscribeMessage('close')
  handleEvent(@MessageBody('id') id: number) {
    console.log(id);
  }

  handleConnection(client: WebSocket) {
    console.log('client connected');
    this.clientMap.set(client, Date.now());
  }

  handleDisconnect(client: WebSocket) {
    console.log('client disconnected');
    this.clientMap.delete(client);

    if (this.clientMap.size === 0) {
      this.shutdownService.shutdown$.next();
    }
  }
}
