import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {
  constructor(private socket: Socket) {
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }

  listen<T>(eventName: string, cb: (data: T) => void) {
    return this.socket.on(eventName, cb);
  }

  emit<T>(eventName: string, data?: T) {
    this.socket.emit(eventName, data);
  }
}
