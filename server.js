// Dependencies
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var request = require("request");
var keys = require('./keys.js')
var https = require('https');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var stripe = require("stripe")(keys.stripe);

// Set up express app
var app = express();
var PORT = process.env.PORT || 3000;
// configuration ============================================================
// set up database connection
var db = require("./models");
// pass passport for configuration
require('./config/passport')(passport, db.user);
// Set up body parser from documentation
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Access static directory
app.use(express.static(__dirname + "/public"));
// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// required for passport
app.use(session(keys.session)); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//Routes
require("./routing/apiRoutes.js")(app, passport);
require("./routing/viewRoutes.js")(app, passport);
require("./routing/cartRoutes.js")(app, passport);
require("./routing/fbRoutes.js")(app, passport);
require("./routing/stripePost.js")(app, passport);
// Pings heroku app to keep awake
//setInterval(function(){
//  https.get('https://rangefront.herokuapp.com/');
//}, 300000);
app.use(function(req,res){
  res.send("404");
});
// Start the server
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});

