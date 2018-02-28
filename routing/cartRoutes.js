var db = require("../models");
module.exports = function(app, passport) {
  // shopping cart view route
  app.get("/cart", function(req, res) {
    if (req.user) {
      db.Cart.findOne({
        where: {
          purchased: false,
          user: req.user.facebook_id
        },
        Order: [["updatedAt", "DESC"]]
      }).then(function(result) {
        db.CartItems.findAll({
          where: { cartId: result.dataValues.id }
        }).then(function(result) {
          var items = [];
          for (var i = 0; i < result.length; i++) {
            items.push(result[i].dataValues);
          }
          res.render("shoppingcart", {
            title: "Cart",
            css: "shoppingCart.css",
            javascript: "shoppingCart.js",
            items: items,
            loggedIn: loggedInView(req)
          });
        });
      });
    } else {
      db.Cart.findOne({
        where: {
          purchased: false,
          sessionID: req.sessionID
        }
      }).then(function(result) {
        if (result) {
          db.CartItems.findAll({
            where: { cartId: result.dataValues.id }
          }).then(function(result) {
            var items = [];
            for (var i = 0; i < result.length; i++) {
              items.push(result[i].dataValues);
            }
            res.render("shoppingcart", {
              title: "Cart",
              css: "shoppingCart.css",
              javascript: "shoppingCart.js",
              items: items,
              loggedIn: loggedInView(req)
            });
          });
        } else {
          res.render("shoppingcart", {
            title: "Cart",
            css: "shoppingCart.css",
            javascript: "shoppingCart.js",
            loggedIn: loggedInView(req)
          });
        }
      });
    }
  });
  // Add product to shopping cart from page
  app.post("/addtocart/:category/:itemid", function(req, res) {
    var user;
    if (req.user) {
      user = req.user.facebook_id;
    }
    db.Cart.findOrCreate({
      where: {
        sessionID: req.sessionID
      },
      defaults: {
        user: user,
        purchased: false
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
  // update item quantity from shopping cart
  app.post("/updateitem/:id", function(req, res) {
    db.cartItems
      .update({
        quantity: req.body.quantity,
        where: {
          id: req.params.id
        }
      })
      .then(function(result) {
        res.redirect("/cart");
      });
  });
  // delete item from shopping cart
  app.post("/deleteitem/:id", function(req, res) {
    db.cartItems
      .delete({
        where: { id: req.params.id }
      })
      .then(function(result) {
        res.redirect("/cart");
      });
  });
};
function loggedInView(req) {
  if (req.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
}
