import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { openWindow } from '../../utils/open-window';

/**
 * The BridgeService is used to build a bridge between the
 * NestJS server and the outside of the NestJS server.
 * The two purposes are to get the port of the express server
 * inside of the NestJS server and to provide a shutdown$
 * steam so that the NestJS server can trigger a full shutdown.
 *
 * @see nodeplotlib.ts
 */
@Injectable()
export class BridgeService {
  shutdown$ = new Subject();
  port$ = new Subject<number>();

  constructor() {
    this.port$.subscribe((port) => {
      openWindow(`http://localhost:${port}`);
    });
  }

  setPort(port: number) {
    this.port$.next(port);
  }

  shutdown() {
    this.shutdown$.next(null);
  }
}
