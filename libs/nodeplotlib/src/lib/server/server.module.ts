import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlotsGateway } from './plots/plots.gateway';
import { PlotsService } from './plots/plots.service';
import { BridgeService } from './services/bridge.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'web'),
    }),
  ],
  providers: [PlotsGateway, PlotsService, BridgeService],
})
export class ServerModule {}
