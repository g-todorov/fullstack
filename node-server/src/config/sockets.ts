import { createServer, Server } from 'http';
import socketIo from 'socket.io';

export const mountSockets = (httpServer: Server) => {
  const io = socketIo(httpServer);

  io.on('connect', (socket: any) => {
    console.log('Connected client on port %s.', this.port);

    socket.on('message', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m));
        this.io.emit('message', m);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};