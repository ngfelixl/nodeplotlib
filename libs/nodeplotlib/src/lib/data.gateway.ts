import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(81, { transports: ['websocket'] })
export class DataGateway {

}
