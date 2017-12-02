var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// bring in the models
var db = require("./models");
var app = express();


// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(__dirname + "./public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

var routes = require("./controllers/trivia_controllers.js");
app.use("/", routes);
app.use("/scores", routes);
app.use("/create", routes);
app.use(express.static("public"));
require("./routes/dbroutes.js")(app);
require("./routes/htmlroutes.js")(app);

// listen on port 3000
var port = process.env.PORT || 3000;
console.log(process.env.JAWSDB_URL)
db.sequelize.sync().then(function() {
	console.log("app is listening on PORT:" + port);
  app.listen(port);
});

console.log(module.exports);