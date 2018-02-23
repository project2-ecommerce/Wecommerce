module.exports = function(app) {
  //index route for landing page
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/learnMore", function (req, res) {
    res.render("learnMore");
  });
  app.get("/aboutUs", function (req, res) {
    res.render("aboutUs");
  });
};
