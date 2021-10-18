import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { PlotsService } from './plots.service';

@WebSocketGateway({ path: '/plots' })
export class PlotsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clientMap = new Map<WebSocket, number>();

  constructor(private plotsService: PlotsService) {}

  @SubscribeMessage('getData')
  getData() {
    return this.plotsService.stacks$.getValue();
  }

  @SubscribeMessage('close')
  handleEvent(@MessageBody('id') id: number) {
    console.log(id);
  }

  handleConnection(client: WebSocket) {
    this.clientMap.set(client, Date.now());
  }

  handleDisconnect(client: WebSocket) {
    this.clientMap.delete(client);
  }
}
