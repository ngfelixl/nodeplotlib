import { Injectable } from '@angular/core';
import { PlotData } from '@npl/nodeplotlib';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketService } from './socket.service';

@Injectable({ providedIn: 'root' })
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
