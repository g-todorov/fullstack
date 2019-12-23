import errorHandler from 'errorhandler';
import { createServer, Server } from 'http';

import app from './app';
import { mountSockets } from './config/sockets';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Create http server.
 */
const http = createServer(app);

/**
 * Integrate web-sockets with Socket Io.
 */
const io = mountSockets(http);

/**
 * Start Express server.
 */
const server = http.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
