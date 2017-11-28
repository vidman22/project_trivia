var path = require("path");

module.exports = function(app) {
  console.log("html route");

  app.get("/blitz", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/blitz.html"));
  });

    app.get("/category", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/category.html"));
  });
 // sets index as a default if no matches are found
  app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
  });
};