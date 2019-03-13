import socketIo from 'socket.io';
import { createServer, Server } from 'http';
import * as passportConfig from './passport';
import expressSession from './express-session';
import { NextFunction } from 'express';

let ioInstance: any;
let socketInstance: any;
let connectedSocketUsers: any[] = [];

export const mountSockets = (httpServer: Server) => {
  ioInstance = socketIo(httpServer);

  ioInstance.use((socket: any, next: NextFunction) => {
    expressSession(socket.request, socket.request.res, next);
  });

  ioInstance.on('connect', (socket: any) => {
    socketInstance = socket;

    const passportAuthentication = socketInstance.request.session.passport;

    if (passportAuthentication) {
      connectedSocketUsers.push({
        [socketInstance.id]: passportAuthentication.user
      });
    }
    // TODO mount all listeners on instantiation
    // socket.on('message', (m: any) => {
    //     console.log('[server](message): %s', JSON.stringify(m));
    //     this.io.emit('message', m);
    // });

    socketInstance.on('disconnect', () => {
      const filteredConnectedSocketUsers = connectedSocketUsers.filter(user => {
        return user[socketInstance.id] == socketInstance.id;
      });
      connectedSocketUsers = filteredConnectedSocketUsers;
    });
  });

  return ioInstance;
};

export const socketEmit = (key: string, data: any) => {
  if (socketInstance) {
    socketInstance.emit(key, data);
  }
};
