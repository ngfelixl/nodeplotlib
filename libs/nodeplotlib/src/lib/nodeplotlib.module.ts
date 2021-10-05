import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DataGateway } from './data.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'web')
    })
  ],
  providers: [
    DataGateway
  ]
})
export class NodeplotlibModule {}
