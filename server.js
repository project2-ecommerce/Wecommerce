// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');

// Set up express app
var app = express();
var PORT = process.env.PORT || 3000;
// configuration ============================================================
// set up database connection
var db = require("./models");

// pass passport for configuration
require('./config/passport')(passport); 
// Set up body parser from documentation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Access static directory
app.use(express.static(__dirname + "/public"));

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Routes
require("./routing/viewRoutes.js")(app, passport);

// Start the server
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});
