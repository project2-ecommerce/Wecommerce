// load all the things we need
var FacebookStrategy = require("passport-facebook").Strategy;
var db = require("../models");

// load up the user model
var User = require("../models/user.js");

// load the auth variables
var configAuth = require("./auth");

module.exports = function(passport, user) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.dataValues.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findOne({ where: { id: id } })
      .then(function(user) {
        done(null, user);
      })
      .error(function(err) {
        done(err, null);
      });
  });

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  passport.use(
    new FacebookStrategy(
      {
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        //enableProof: true,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
      },
      function(req, token, refreshToken, profile, done) {
        // check if the user is already logged in
        console.log(profile);
        if (!req.user) {
          db.User.findOne({ where: { facebook_id: profile.id } }).then(function(
            user
          ) {
            if (user) {
              if (user) {
                return done(null, user);
              }
            } else {
              db.User.create({
                facebook_id: profile.id,
                token: token,
                name: profile.displayName
                // email: profile.emails[0].value
              }).then(function(user) {
                return done(null, user);
              });
            }
          });
        } else {
          // user already exists and is logged in, we have to link accounts
          console.log("USER IS ALREADY SIGNED IN, LINK ACCOUNTS");
          console.log(req.user);
        }
      }
    )
  );
};
