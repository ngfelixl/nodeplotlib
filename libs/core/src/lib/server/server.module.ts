import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlotsGateway } from './plots/plots.gateway';
import { PlotsService } from './plots/plots.service';
import { ShutdownService } from './services/shutdown.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'web'),
    }),
  ],
  providers: [PlotsGateway, PlotsService, ShutdownService],
})
export class ServerModule {}
