import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketIoEndpoint, { transports: ['polling'] });

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

  ngOnDestroy() {
    this.socket?.disconnect();
  }
}
