import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlotsController } from './plots/plots.controller';
import { PlotsService } from './plots/plots.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'web'),
    }),
  ],
  controllers: [PlotsController],
  providers: [PlotsService],
})
export class ServerModule {}
