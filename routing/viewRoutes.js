var db = require("../models");
module.exports = function(app, passport) {
  //index route for landing page
  app.get("/", function(req, res) {
    res.render("index", {
      title: "Wecommerce",
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
      javascript: "learnMore.js",
      loggedIn: loggedInView(req)
    });
  });
  app.get('/tents', function (req, res) {
    db.Products.findAll({
      where:{category:"tent"}
    }).then(function(results){
      console.log(results);
      res.render("tents", {
      title: "Tents - Wecommerce",
      css: "products.css",
      javascript: "index.js",
      items:results
      });
    });
  });
  app.get("/cart", function(req, res) {
    res.render("shoppingcart", {
      title: "Cart",
      css: "shoppingCart.css",
      javascript: "shoppingCart.js",
      loggedIn: loggedInView(req)
    });
  });

  // route for showing the profile page
  app.get("/profile", isLoggedIn, function(req, res) {
    // console.log(req.user);
    res.render("profile", {
      title: "Your Profile",
      css: "profile.css",
      user: req.user, // get the user out of session and pass to template
      loggedIn: loggedInView(req)
    });
  });
  // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}; //end of export

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function loggedInView(req) {
  if (req.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
}
