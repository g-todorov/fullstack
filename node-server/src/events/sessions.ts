
import { socketEmit, socketEmitTo } from '../config/sockets';

import mongoose from 'mongoose';

export const emitSessionUpdate = (userId: number, sessionUsers: string[]) => {
  socketEmit(userId, 'sessionUpdated', {test: 'test'});
  // TODO This should be solved with e socket channel/room
  // TODO userId and connectedUsers should be validated via typescript
  sessionUsers.forEach((sessionUserId: any)  => {
    socketEmitTo(sessionUserId.toString(), 'sessionUpdated', {
      message: 'Session has been updated',
    });
  });
};
