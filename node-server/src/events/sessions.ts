
import { socketEmit, socketEmitTo, getSocketUsersMap } from '../config/sockets';

import mongoose from 'mongoose';

export const emitSessionUpdate = (sessionId: any, sessionUsers: string[]) => {
  socketEmit('sessionUpdated', {test: 'test'});
  // TODO This should be solved with e socket channel
  // TODO userId and connectedUsers should be validated vie typescript
  const connectedUsers = getSocketUsersMap();
  sessionUsers.forEach((userId: any)  => {
    socketEmitTo(connectedUsers[userId.toString()], 'sessionUpdated', {
      message: 'Session has been updated',
    });
  });
};
