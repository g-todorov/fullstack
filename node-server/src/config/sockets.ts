import socketIo from 'socket.io';
import { createServer, Server } from 'http';
import * as passportConfig from './passport';
import expressSession from './express-session';
import { NextFunction } from 'express';

let ioInstance: any;

const connectedSocketUsers: any[] = [];

export const mountSockets = (httpServer: Server) => {
  ioInstance = socketIo(httpServer);

  ioInstance.use((socket: any, next: NextFunction) => {
    expressSession(socket.request, socket.request.res, next);
  });

  ioInstance.on('connect', (socketInstance: any) => {
    const passportAuthentication = socketInstance.request.session.passport;

    // TODO this should be further investigated;
    // const isAlreadyConnected: boolean = connectedSocketUsers[passportAuthentication.user];

    if (passportAuthentication) {
      connectedSocketUsers[passportAuthentication.user] = socketInstance;
    }

    // TODO mount all listeners on instantiation
    // socket.on('message', (m: any) => {
    //     console.log('[server](message): %s', JSON.stringify(m));
    //     this.io.emit('message', m);
    // });

    socketInstance.on('disconnect', () => {
      // TODO this is buggy
      if (passportAuthentication) {
        delete connectedSocketUsers[passportAuthentication.user];
      }
    });
  });

  return ioInstance;
};

export const socketEmit = (userId: number, key: string, data: any) => {
  if (connectedSocketUsers[userId]) {
    connectedSocketUsers[userId].emit(key, data);
  }
};

export const socketEmitTo = (toUserId: any, key: string, data: any) => {
  if (connectedSocketUsers[toUserId]) {
    ioInstance.to(connectedSocketUsers[toUserId].id).emit(key, data);
  }
};

export const getSocketUsersMap = (): any => {
  return connectedSocketUsers;
};
