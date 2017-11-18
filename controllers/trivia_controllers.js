// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last week's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require("express");
var router = express.Router();
// edit model to match sequelize
var db = require("../models/");


// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/scores");
});

// get route, edited to match sequelize
router.get("/scores", function(req, res) {
  // replace old function with sequelize function
  db.Trivia.findAll()
    // use promise method to pass the scores...
    .then(function(dbTrivia) {
      console.log(dbTrivia);
      // into the main index, updating the page
      var hbsObject = { scores: dbTrivia };
      return res.render("index", hbsObject);
    });
});

// post route to submit usename
router.post("/username/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.Trivia.create({
    username: req.body.username
  })
    // pass the result of our call
  .then(function(dbTrivia) {
      // log the result to our terminal/bash window
    console.log(dbTrivia);
      // redirect
    res.redirect("/");
  });
});


module.exports = router;