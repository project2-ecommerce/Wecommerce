var db = require("../models");
module.exports = function(app, passport) {
  //index route for landing page
  app.get("/", function(req, res) {
    res.render("index", {
      title: "Range Front",
      css: "index.css",
      javascript: "index.js",
      loggedIn: loggedInView(req)
    });
  });

  app.get("/learn-more", function(req, res) {
    res.render("learnMore", {
      title: "Learn More",
      css: "learnMore.css",
      javascript: "learnMore.js",
      loggedIn: loggedInView(req)
    });
  });
  app.get("/about-us", function(req, res) {
    res.render("aboutUs", {
      title: "About Us",
      css: "aboutUs.css",
      javascript: "aboutUs.js",
      loggedIn: loggedInView(req)
    });
  });
  
  // route for showing the profile page
  app.get("/profile", isLoggedIn, function(req, res) {
    db.Cart.findOne({
      where: { sessionID: req.sessionID }
    }).then(function(result) {
      if (result) {
        db.Cart.update({
          user: req.user.facebook_id,
          where: {
            sessionID: req.sessionID
          }
        }).then(function(result) {
          console.log("first result");
        });
      } else {
        db.Cart.create({
          sessionID: req.sessionID,
          user: req.user.facebook_id,
          purchased: false
        }).then(function(result) {
          console.log("second result");
        });
      }
    });
    res.render("profile", {
      title: "Your Profile",
      css: "profile.css",
      user: req.user, // get the user out of session and pass to template
      loggedIn: loggedInView(req)
    });
  });
};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();
  // if they aren't redirect them to the home page
  res.redirect("/");
}

function loggedInView(req) {
  if (req.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
}
