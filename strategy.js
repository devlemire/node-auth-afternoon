const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy({
   domain:       'jameslemire.auth0.com',
   clientID:     '4_8ZQzEOP6mYeoQbeAmscWFmjl-SjIVt',
   clientSecret: '0jst7L31Ygbol37KTMTV504h-OO73anLV_wAoRIsueBgCVR83gtV4vE6FpZJaUhW',
   callbackURL:  '/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);