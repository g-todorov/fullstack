import socketIo from 'socket.io';
import { createServer, Server } from 'http';
import * as passportConfig from './passport';

let io: any;

export const mountSockets = (httpServer: Server) => {
  io = socketIo(httpServer);

  io.on('connect', (socket: any) => {
    console.log('Connected socket client');

    // TODO: implement authentication
    // passportConfig.isAuthenticated(

    // )
    socket.on('message', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.io.emit('message', m);
    });

    socket.on('disconnect', () => {
      console.log('Socket client disconnected');
    });
  });

  return io;
};