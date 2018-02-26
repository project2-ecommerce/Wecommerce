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
  app.get("/learnmore", function(req, res) {
    res.render("learnMore", {
      title: "Learn More",
      css: "learnMore.css",
      javascript: "learnMore.js",
      loggedIn: loggedInView(req)
    });
  });
  app.get("/aboutus", function(req, res) {
    res.render("aboutUs", {
      title: "About Us",
      css: "aboutUs.css",
      javascript: "learnMore.js",
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

  // POST ROUTES
  app.post("/:category/:itemid", function(req, res) {
    console.log(req.body);
    console.log(req.sessionID);
    console.log(req.user);
    // if user doesn't have a cart upon adding an item, make a cart
    db.Cart.findOrCreate({
      where: {
        sessionID: req.sessionID,
        purchased: false
      }
    }).then(function(result) {
      // save cartID for later
      var cartID = result[0].dataValues.id
      // check if this item has already been added to the cart to prevent dublicates 
      db.CartItems.findOne({
        where: {
          itemID: req.params.itemid
        }
      }).then(function(result) {
        // if the item of that id is already in cart, just update the item quantity 
        if (result) {
          db.CartItems.update(
            {
              itemQuantity:
                result.dataValues.itemQuantity + req.body.itemQuantity
            },
            {
              where: {
                itemID: req.params.itemid
              }
            }
          ).then(function(result) {
            res.json(result);
          });
        } else {
          // if the item is not already in the cart, add the new item to the cart
          db.CartItems.create({
            cartID: cartID,
            FBuser_ID: null,
            itemID: req.params.itemid,
            itemQuantity: req.body.itemQuantity,
            itemPrice: req.body.itemPrice
          }).then(function(result) {
            res.json(result);
          });
        }
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
