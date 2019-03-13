import session from 'express-session';
import mongo from 'connect-mongo';
import { MONGODB_URI, SESSION_SECRET } from '../utils/secrets';

const MongoStore = mongo(session);

const expressSession = session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    httpOnly: false
  },
  store: new MongoStore({
    url: MONGODB_URI,
    autoReconnect: true
  })
});

export default expressSession;
