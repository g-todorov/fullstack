import socketIo from 'socket.io';
import { createServer, Server } from 'http';
import * as passportConfig from './passport';

let ioInstance: any;
let socketInstance: any;

export const mountSockets = (httpServer: Server) => {
  ioInstance = socketIo(httpServer);

  ioInstance.on('connect', (socket: any) => {
    console.log('Connected socket client');
    socketInstance = socket;
    // TODO: implement authentication
    // passportConfig.isAuthenticated(

    // )
    // socket.on('message', (m: any) => {
    //     console.log('[server](message): %s', JSON.stringify(m));
    //     this.io.emit('message', m);
    // });

    socketInstance.on('disconnect', () => {
      console.log('Socket client disconnected');
    });
  });

  return ioInstance;
};

export const socketEmit = (key: string, data: any) => {
  if (socketInstance) {
    socketInstance.emit(key, data);
  }
};
