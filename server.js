// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Set up express app
var app = express();
var PORT = process.env.PORT || 3000;

// Set up body parser from documentation
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Access static directory
app.use(express.static(__dirname + "/public"));

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Routes
require('./routing/viewRoutes.js')(app);

// Start the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});