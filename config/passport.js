// load all the things we need
var FacebookStrategy = require("passport-facebook").Strategy;
var db = require("../models");

// load up the user model
var User = require("../models/user");

// load the auth variables
var configAuth = require("./auth");

module.exports = function(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.find({ where: { id: id } })
      .success(function(user) {
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
        if (!req.user) {
          db.User.findOne({ where: { facebookid: profile.id } }).then(function(
            user
          ) {
            if (user) {
              // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.facebooktoken) {
                user.facebooktoken = token;
                user.facebookname =
                  profile.name.givenName + " " + profile.name.familyName;
                user.facebookemail = profile.emails[0].value;

                user
                  .save()
                  .then(function() {
                    done(null, user);
                  })
                  .catch(function(e) {});
              } else {
                done(null, user);
              }
            } else {
              // if there is no user, create them
              var newUser = User.build({
                facebookid: profile.id,
                facebooktoken: token,
                facebookname:
                  profile.name.givenName + " " + profile.name.familyName,
                facebookemail: profile.emails[0].value
              });
              newUser
                .save()
                .then(function() {
                  done(null, user);
                })
                .catch(function(e) {});
            }
          });
        } else {
          // user already exists and is logged in, we have to link accounts
          var user = req.user; // pull the user out of the session

          user.facebookid = profile.id;
          user.facebooktoken = token;
          user.facebookname =
            profile.name.givenName + " " + profile.name.familyName;
          user.facebookemail = profile.emails[0].value;

          user
            .save()
            .then(function() {
              done(null, user);
            })
            .catch(function(e) {});
        }
      }
    )
  );
};
