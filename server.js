var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// bring in the models
var db = require("./models");
var app = express();


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "./public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));


// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));


var routes = require("./controllers/trivia_controllers.js");
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);


// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
	console.log("app is listening")
  app.listen(port);
});

console.log(module.exports);