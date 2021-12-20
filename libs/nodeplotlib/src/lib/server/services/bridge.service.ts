import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { openWindow } from '../../utils/open-window';

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
