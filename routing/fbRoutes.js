module.exports = function(app, passport) {
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
