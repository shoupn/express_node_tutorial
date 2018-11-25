const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router(nav) {
  const {
    signUp,
    getSignin,
    profileAll,
    userProfile
  } = authController(nav);

  authRouter.route('/signup')
    .post(signUp);

  authRouter.route('/signin')
    .get(getSignin)
    // using passport middleware for posting from sighin form
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all(profileAll)
    .get(userProfile);
  return authRouter;
}

module.exports = router;
