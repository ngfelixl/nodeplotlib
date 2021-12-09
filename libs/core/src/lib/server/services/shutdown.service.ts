import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class ShutdownService {
  shutdown$ = new Subject();

  shutdown() {
    this.shutdown$.next();
  }
}
