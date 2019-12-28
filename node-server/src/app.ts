import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import flash from 'express-flash';
import passport from 'passport';

import expressSession from './config/express-session';
import connectToDB from './config/db';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

// Routes
import router from './routes';

// Controllers (route handlers)
import * as userController from './controllers/user';
import * as questionController from './controllers/question';
import * as gameController from './controllers/game';
import * as sessionController from './controllers/session';

// API keys and Passport configuration
import * as passportConfig from './config/passport';

// Create Express server
const app = express();

// Connect to MongoDB
connectToDB();

// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * Primary app routes.
 */
app.use(router);

// app.get('/forgot', userController.getForgot);
// app.post('/forgot', userController.postForgot);
// app.get('/reset/:token', userController.getReset);
// app.post('/reset/:token', userController.postReset);
// app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
// app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
// app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
// app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

export default app;
