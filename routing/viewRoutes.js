module.exports = function(app) {
  //index route for landing page
  app.get("/", function(req, res) {
    res.render("index", {title: "Wecommerce", css: "index.css", javascript: "index.js"});
  });
  app.get("/learnmore", function (req, res) {
    res.render("learnMore", {title: "Learn More", css: "learnMore.css", javascript: "learnMore.js"});
  });
  app.get("/aboutus", function (req, res) {
    res.render("aboutUs");
  });
};
