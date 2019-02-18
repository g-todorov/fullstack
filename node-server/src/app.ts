import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongo from 'connect-mongo';
import flash from 'express-flash';
import mongoose from 'mongoose';
import passport from 'passport';
import expressValidator from 'express-validator';
import bluebird from 'bluebird';
import { MONGODB_URI, SESSION_SECRET } from './utils/secrets';

import seedUsers from './utils/data-seed';

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

// Controllers (route handlers)
import * as userController from './controllers/user';
import * as questionController from './controllers/question';
import * as gameController from './controllers/game';

// API keys and Passport configuration
import * as passportConfig from './config/passport';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, { useMongoClient: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    if (process.env.NODE_ENV !== 'production') {
      seedUsers();
    }

  },
).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  // process.exit();
});


// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    httpOnly: false
  },
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * Primary app routes.
 * TODO Abstract in a separate file/folder.
 */
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/me', userController.isAuthenticated);

app.post('/question', questionController.postQuestion);

app.get('/getGamesByUserId', gameController.getGamesByUserId);
app.post('/game', gameController.postGame);

app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.post('/register', userController.register);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

export default app;
