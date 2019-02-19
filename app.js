'use strict';

const assert = require('assert');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = app => {
  const config = app.config.passportJwt;
  assert(
    config.secret,
    '[egg-passport-jwt] config.passportJwt.secret required'
  );

  config.passReqToCallback = true;
  config.secretOrKey = config.secret;
  config.jwtFromRequest =
    config.jwtFromRequest || ExtractJwt.fromAuthHeaderAsBearerToken();

  app.passport.use(
    'jwt',
    new JwtStrategy(config, (req, payload, done) => {
      const user = {
        provider: 'jwt',
        ...payload,
      };
      app.passport.doVerify(req, user, done);
    })
  );
};
