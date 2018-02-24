// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Set up express app
var app = express();
var PORT = process.env.PORT || 3000;
var db = require("./models");
// Set up body parser from documentation
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Access static directory
app.use(express.static(__dirname + "/public"));

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routes
require("./routing/viewRoutes.js")(app);
require("./routing/apiRoutes.js")(app);
// Start the server
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});
