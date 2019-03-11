import { socketEmit } from '../config/sockets';

export const emitSessionUpdate = () => {
  socketEmit('sessionUpdated', {test: 'test'});
};
