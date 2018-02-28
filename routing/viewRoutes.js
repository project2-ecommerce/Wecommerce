var db = require("../models");
module.exports = function(app, passport) {
  //index route for landing page
  app.get("/", function(req, res) {
    console.log(req.sessionID);
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
  app.get("/cart", function(req, res) {
    if (req.user) {
      db.Cart.findOne({
        where: {
          purchased: false,
          user: req.user.facebook_id
        }, 
        Order: [['updatedAt', 'DESC']]
      }).then(function(result){
        // console.log(result);
      });
    }
    res.render("shoppingcart", {
      title: "Cart",
      css: "shoppingCart.css",
      javascript: "shoppingCart.js",
      loggedIn: loggedInView(req)
    });
  });

  // route for showing the profile page
  app.get("/profile", isLoggedIn, function(req, res) {
    db.Cart.findOne({
      where:{sessionID: req.sessionID}
    }).then(function(result){
      if (result) {
        db.Cart.update({
          user: req.user.facebook_id,
          where: {
            sessionID: req.sessionID
          }
        }).then(function(result){
          console.log('first result');
        });
      } else {
        db.Cart.create({
          sessionID: req.sessionID,
          user: req.user.facebook_id,
          purchased: false
        }).then(function(result){
          console.log('second result');
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

  // POST ROUTES
  app.post("/addtocart/:category/:itemid", function(req, res) {
    db.Cart.findOrCreate({
      where: {
        sessionID: req.sessionID,
        purchased: false,
        user: req.body.id
      }
    }).then(function(result) {
      db.CartItems.findOrCreate({
        where: {
          CartId: result[0].dataValues.id,
          ProductId: req.params.itemid,
          quantity: req.body.quantity
        }
      }).then(function(result) {
        res.redirect("/cart");
      });
    });
  });
  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile", "email"]
    })
  );

  // handle the callback after facebook has authenticated the user
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/"
    })
  );

  // route for logging out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
}; //end of export

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
