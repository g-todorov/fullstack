import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import { default as User, UserModel, AuthToken } from '../models/User';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import '../config/passport';
import { check, sanitize, validationResult } from 'express-validator';

import _ from 'lodash';

export const getAuthenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, id, role } = req.user as UserModel;

  return res.status(200).json({
    message: 'User is authenticated.',
    data: {
      isAuthenticated: true,
      user: {
        email: email,
        id: id,
        role: role,
      },
    },
  });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password cannot be blank').notEmpty().run(req);
  // eslint-disable-next-line @typescript-eslint/camelcase
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors,
      message: 'Bad request data'
    });
  }

  passport.authenticate('local', (err: Error, user: UserModel, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
      return res.status(400).json({
        message: 'Account with that user credentials does not exists.'
      });
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.status(201)
        .cookie('node-server-token', req.sessionID, { maxAge: 86400 })
        .json({
          message: 'User has been logged in.',
          user: {
            email: user.email,
            role: user.role,
            id: user.id,
          },
        });
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    res.status(200)
      .clearCookie('node-server-token')
      .json({
        message: 'Successful logout.'
      });
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password', 'Password must be at least 4 characters long').isLength({ min: 4 }).run(req);
  // req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  // eslint-disable-next-line @typescript-eslint/camelcase
  await sanitize('email').normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors,
      message: 'Bad request data'
    });
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(400).json({
        message: 'Account with that email address already exists.'
      });
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(201)
          .cookie('node-server-token', req.sessionID, { maxAge: 86400 })
          .json({ message: 'User has been created.' });
      });
    });
  });
};


export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId, (err, user: UserModel) => {
    if (err) { return next(err); }

    return res.status(200).json({
      data: user,
      message: 'User found.'
    });
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
// export let postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
//   req.assert('email', 'Please enter a valid email address.').isEmail();
//   req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/account');
//   }

//   User.findById(req.user.id, (err, user: UserModel) => {
//     if (err) { return next(err); }
//     user.email = req.body.email || '';
//     user.profile.name = req.body.name || '';
//     user.profile.gender = req.body.gender || '';
//     user.profile.location = req.body.location || '';
//     user.profile.website = req.body.website || '';
//     user.save((err: WriteError) => {
//       if (err) {
//         if (err.code === 11000) {
//           req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
//           return res.redirect('/account');
//         }
//         return next(err);
//       }
//       req.flash('success', { msg: 'Profile information has been updated.' });
//       res.redirect('/account');
//     });
//   });
// };

// /**
//  * POST /account/password
//  * Update current password.
//  */
// export let postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
//   req.assert('password', 'Password must be at least 4 characters long').len({ min: 4 });
//   req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/account');
//   }

//   User.findById(req.user.id, (err, user: UserModel) => {
//     if (err) { return next(err); }
//     user.password = req.body.password;
//     user.save((err: WriteError) => {
//       if (err) { return next(err); }
//       req.flash('success', { msg: 'Password has been changed.' });
//       res.redirect('/account');
//     });
//   });
// };

/**
 * POST /account/delete
 * Delete user account.
 */
// export let postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
//   User.remove({ _id: req.user.id }, (err) => {
//     if (err) { return next(err); }
//     req.logout();
//     req.flash('info', { msg: 'Your account has been deleted.' });
//     res.redirect('/');
//   });
// };

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
// export let getOauthUnlink = (req: Request, res: Response, next: NextFunction) => {
//   const provider = req.params.provider;
//   User.findById(req.user.id, (err, user: any) => {
//     if (err) { return next(err); }
//     user[provider] = undefined;
//     user.tokens = user.tokens.filter((token: AuthToken) => token.kind !== provider);
//     user.save((err: WriteError) => {
//       if (err) { return next(err); }
//       req.flash('info', { msg: `${provider} account has been unlinked.` });
//       res.redirect('/account');
//     });
//   });
// };

/**
 * GET /reset/:token
 * Reset Password page.
 */
// export let getReset = (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   User
//     .findOne({ passwordResetToken: req.params.token })
//     .where('passwordResetExpires').gt(Date.now())
//     .exec((err, user) => {
//       if (err) { return next(err); }
//       if (!user) {
//         req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
//         return res.redirect('/forgot');
//       }
//       res.render('account/reset', {
//         title: 'Password Reset'
//       });
//     });
// };

/**
 * POST /reset/:token
 * Process the reset password request.
 */
// export let postReset = (req: Request, res: Response, next: NextFunction) => {
//   req.assert('password', 'Password must be at least 4 characters long.').len({ min: 4 });
//   req.assert('confirm', 'Passwords must match.').equals(req.body.password);

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('back');
//   }

//   async.waterfall([
//     function resetPassword(done: Function) {
//       User
//         .findOne({ passwordResetToken: req.params.token })
//         .where('passwordResetExpires').gt(Date.now())
//         .exec((err, user: any) => {
//           if (err) { return next(err); }
//           if (!user) {
//             req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
//             return res.redirect('back');
//           }
//           user.password = req.body.password;
//           user.passwordResetToken = undefined;
//           user.passwordResetExpires = undefined;
//           user.save((err: WriteError) => {
//             if (err) { return next(err); }
//             req.logIn(user, (err) => {
//               done(err, user);
//             });
//           });
//         });
//     },
//     function sendResetPasswordEmail(user: UserModel, done: Function) {
//       const transporter = nodemailer.createTransport({
//         service: 'SendGrid',
//         auth: {
//           user: process.env.SENDGRID_USER,
//           pass: process.env.SENDGRID_PASSWORD
//         }
//       });
//       const mailOptions = {
//         to: user.email,
//         from: 'express-ts@starter.com',
//         subject: 'Your password has been changed',
//         text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
//       };
//       transporter.sendMail(mailOptions, (err) => {
//         req.flash('success', { msg: 'Success! Your password has been changed.' });
//         done(err);
//       });
//     }
//   ], (err) => {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// };

/**
 * GET /forgot
 * Forgot Password page.
 */
// export let getForgot = (req: Request, res: Response) => {
//   if (req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   res.render('account/forgot', {
//     title: 'Forgot Password'
//   });
// };

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
// export let postForgot = (req: Request, res: Response, next: NextFunction) => {
//   req.assert('email', 'Please enter a valid email address.').isEmail();
//   req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

//   const errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/forgot');
//   }

//   async.waterfall([
//     function createRandomToken(done: Function) {
//       crypto.randomBytes(16, (err, buf) => {
//         const token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function setRandomToken(token: AuthToken, done: Function) {
//       User.findOne({ email: req.body.email }, (err, user: any) => {
//         if (err) { return done(err); }
//         if (!user) {
//           req.flash('errors', { msg: 'Account with that email address does not exist.' });
//           return res.redirect('/forgot');
//         }
//         user.passwordResetToken = token;
//         user.passwordResetExpires = Date.now() + 3600000; // 1 hour
//         user.save((err: WriteError) => {
//           done(err, token, user);
//         });
//       });
//     },
//     function sendForgotPasswordEmail(token: AuthToken, user: UserModel, done: Function) {
//       const transporter = nodemailer.createTransport({
//         service: 'SendGrid',
//         auth: {
//           user: process.env.SENDGRID_USER,
//           pass: process.env.SENDGRID_PASSWORD
//         }
//       });
//       const mailOptions = {
//         to: user.email,
//         from: 'hackathon@starter.com',
//         subject: 'Reset your password on Hackathon Starter',
//         text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
//           Please click on the following link, or paste this into your browser to complete the process:\n\n
//           http://${req.headers.host}/reset/${token}\n\n
//           If you did not request this, please ignore this email and your password will remain unchanged.\n`
//       };
//       transporter.sendMail(mailOptions, (err) => {
//         req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
//         done(err);
//       });
//     }
//   ], (err) => {
//     if (err) { return next(err); }
//     res.redirect('/forgot');
//   });
// };
