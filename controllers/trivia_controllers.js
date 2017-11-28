// This file uses Sequelize to manage data manipulation
// for all apropos http requests.

var express = require("express");
var router = express.Router();
// edit model to match sequelize
var db = require("../models/");


// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/index.html");
});


// get route, edited to match sequelize
router.get("/scores", function(req, res) {
  // replace old function with sequelize function
  db.Trivia.findAll({})
    // use promise method to pass the scores...
    .then(function(dbTrivia) {
      console.log(dbTrivia);

      // into the main index, updating the page
      res.json(dbTrivia)
    })

    .catch(function(err) {
      return err;
    });
});


// post route to submit username
router.post("/username/create", function(req, res) {
  // edited trivia create to add in a username
  db.Trivia.create({
    username: req.body.username,
    score: req.body.score
  })
    // pass the result of our call
  .then(function(dbTrivia) {
      // log the result to our terminal/bash window
    console.log(dbTrivia);
      // redirect
    res.end();
  })

    .catch(function(err) {
      return err;
    });
});


// router.put("/score/update", function(req, res) {
//   // update one of the scores
//   db.Trivia.update({
//     score: 0
//   },
//     {
//       where: {
//         id: req.body.id
//       }
//     }
//   ).then(function(dbTrivia) {
//     res.redirect("/");
//   })

//     .catch(function(err) {
//       return err;
//     });
// });


module.exports = router;