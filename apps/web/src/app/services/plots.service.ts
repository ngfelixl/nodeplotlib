import { Injectable } from '@angular/core';
import { PlotData } from '@npl/interfaces';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';
import { map } from 'rxjs/operators';

@Injectable()
export class PlotsService {
  private plotDataMap$ = new BehaviorSubject<Map<number, PlotData>>(new Map());
  plots$ = this.plotDataMap$.pipe(
    map((plotDataMap) => Array.from(plotDataMap.values()))
  );

  constructor(private socketService: SocketService) {
    this.socketService.listen<PlotData>('plotdata', (data) => {
      const plots = this.plotDataMap$.value;
      plots.set(data.id, data);
      this.plotDataMap$.next(plots);
    });
    this.socketService.emit('readplots');
  }
}
